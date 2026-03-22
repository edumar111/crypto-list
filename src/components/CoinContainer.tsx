import { Link, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { useCoin } from "../hooks/useCoin";
import {
    ArrowLeft,
    BarChart3,
    CalendarDays,
    Coins,
    Database,
    DollarSign,
    Gauge,
    Hash,
    Landmark,
    Layers,
    RefreshCw,
    TrendingDown,
    TrendingUp,
} from "lucide-react";

const formatCurrency = (value?: number | null) => {
    if (value === null || value === undefined) return "N/A";
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: value >= 1 ? 2 : 6,
        maximumFractionDigits: value >= 1 ? 2 : 6,
    }).format(value);
};

const formatNumber = (value?: number | null, maxDecimals = 2) => {
    if (value === null || value === undefined) return "N/A";
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: maxDecimals,
    }).format(value);
};

const formatPercent = (value?: number | null) => {
    if (value === null || value === undefined) return "N/A";
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
};

const formatDate = (value?: string) => {
    if (!value) return "N/A";
    return new Date(value).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

const CoinContainer = () => {
    const { id } = useParams();
    const { data: coin, isLoading: loading, isRefetching, error } = useCoin(id);

    const priceRange = coin && coin.high_24h !== undefined && coin.low_24h !== undefined
        ? coin.high_24h - coin.low_24h
        : 0;

    const rangePosition = coin && coin.current_price !== undefined && coin.low_24h !== undefined && priceRange > 0
        ? ((coin.current_price - coin.low_24h) / priceRange) * 100
        : 0;

    const safeRangePosition = Math.max(0, Math.min(100, rangePosition));

    const changeClass = coin && (coin.price_change_percentage_24h ?? 0) >= 0 ? "text-green-600" : "text-red-600";
    const athClass = coin && (coin.ath_change_percentage ?? 0) >= 0 ? "text-green-600" : "text-red-600";
    const atlClass = coin && (coin.atl_change_percentage ?? 0) >= 0 ? "text-green-600" : "text-red-600";

    return(
        <>
            {isRefetching ? (
                <div className="pointer-events-none fixed right-4 top-4 z-50">
                    <div
                        role="status"
                        aria-live="polite"
                        className="flex items-center gap-2 rounded-full border border-sky-200 bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-lg ring-4 ring-sky-100"
                    >
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Actualizando datos...
                    </div>
                </div>
            ) : null}

            <section className="space-y-4">
                {!id ? (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                        <p className="font-semibold text-red-700">Moneda no encontrada</p>
                        <Link
                            to="/"
                            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-400 hover:text-gray-900"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Volver al listado
                        </Link>
                    </div>
                ) : loading ? (
                    <Spinner />
                ) : error ? (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                        <p className="font-semibold text-red-700">{error.message}</p>
                        <Link
                            to="/"
                            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-400 hover:text-gray-900"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Volver al listado
                        </Link>
                    </div>
                ) : coin ? (
                    <>
                        <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <img src={coin.image} alt={coin.symbol} className="h-12 w-12 rounded-full" />
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{coin.name}</h1>
                                    <p className="flex items-center gap-1.5 text-sm font-semibold uppercase text-gray-500">
                                        <Coins className="h-3.5 w-3.5 text-blue-500" />
                                        {coin.symbol}
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="flex items-center justify-end gap-1.5 text-3xl font-bold text-gray-900">
                                    <DollarSign className="h-6 w-6 text-blue-500" />
                                    {formatCurrency(coin.current_price)}
                                </p>
                                <p className={`text-sm font-semibold ${changeClass}`}>
                                    {formatPercent(coin.price_change_percentage_24h)} ({formatCurrency(coin.price_change_24h)})
                                </p>
                            </div>
                        </div>
                    </article>

                    <article className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                <Landmark className="h-4 w-4 text-blue-500" />
                                Market Cap
                            </p>
                            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(coin.market_cap)}</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                <BarChart3 className="h-4 w-4 text-blue-500" />
                                Volume 24h
                            </p>
                            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(coin.total_volume)}</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                <Hash className="h-4 w-4 text-blue-500" />
                                Market Cap Rank
                            </p>
                            <p className="mt-2 text-2xl font-bold text-gray-900">#{coin.market_cap_rank ?? "N/A"}</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                <Database className="h-4 w-4 text-blue-500" />
                                Fully Diluted Valuation
                            </p>
                            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(coin.fully_diluted_valuation)}</p>
                        </div>
                    </article>

                    <article className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                                <TrendingUp className="h-5 w-5 text-blue-500" />
                                All-Time High
                            </h2>
                            <div className="mt-4 space-y-2 text-sm text-gray-600">
                                <div className="flex items-center justify-between gap-4">
                                    <span>Price:</span>
                                    <span className="font-semibold text-gray-900">{formatCurrency(coin.ath)}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span>Change:</span>
                                    <span className={`font-semibold ${athClass}`}>{formatPercent(coin.ath_change_percentage)}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="flex items-center gap-1.5">
                                        <CalendarDays className="h-4 w-4 text-blue-500" />
                                        Date:
                                    </span>
                                    <span className="font-medium text-gray-700">{formatDate(coin.ath_date)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                                <TrendingDown className="h-5 w-5 text-blue-500" />
                                All-Time Low
                            </h2>
                            <div className="mt-4 space-y-2 text-sm text-gray-600">
                                <div className="flex items-center justify-between gap-4">
                                    <span>Price:</span>
                                    <span className="font-semibold text-gray-900">{formatCurrency(coin.atl)}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span>Change:</span>
                                    <span className={`font-semibold ${atlClass}`}>{formatPercent(coin.atl_change_percentage)}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="flex items-center gap-1.5">
                                        <CalendarDays className="h-4 w-4 text-blue-500" />
                                        Date:
                                    </span>
                                    <span className="font-medium text-gray-700">{formatDate(coin.atl_date)}</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                            <Gauge className="h-5 w-5 text-blue-500" />
                            24h Price Range
                        </h2>
                        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                            <div>
                                <p>Low</p>
                                <p className="text-lg font-bold text-gray-900">{formatCurrency(coin.low_24h)}</p>
                            </div>
                            <div className="text-right">
                                <p>High</p>
                                <p className="text-lg font-bold text-gray-900">{formatCurrency(coin.high_24h)}</p>
                            </div>
                        </div>
                        <div className="mt-3 h-2.5 rounded-full bg-gray-200">
                            <div
                                className="h-2.5 rounded-full bg-blue-500 transition-all"
                                style={{ width: `${safeRangePosition}%` }}
                            />
                        </div>
                    </article>

                    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                            <Layers className="h-5 w-5 text-blue-500" />
                            Supply Information
                        </h2>
                        <div className="mt-4 grid gap-4 sm:grid-cols-3">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Circulating Supply</p>
                                <p className="mt-1 text-lg font-bold text-gray-900">{formatNumber(coin.circulating_supply, 4)}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Total Supply</p>
                                <p className="mt-1 text-lg font-bold text-gray-900">{formatNumber(coin.total_supply, 4)}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Max Supply</p>
                                <p className="mt-1 text-lg font-bold text-gray-900">{coin.max_supply ? formatNumber(coin.max_supply, 4) : "N/A"}</p>
                            </div>
                        </div>
                    </article>

                    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                            <Database className="h-5 w-5 text-blue-500" />
                            Market Details
                        </h2>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-50 px-4 py-3">
                                <span className="flex items-center gap-1.5 text-sm text-gray-600">
                                    <Hash className="h-4 w-4 text-blue-500" />
                                    ID
                                </span>
                                <span className="text-sm font-semibold text-gray-900">{coin.id}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-50 px-4 py-3">
                                <span className="flex items-center gap-1.5 text-sm text-gray-600">
                                    <Landmark className="h-4 w-4 text-blue-500" />
                                    Market Cap Change 24h
                                </span>
                                <span className="text-sm font-semibold text-gray-900">{formatCurrency(coin.market_cap_change_24h)}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-50 px-4 py-3">
                                <span className="flex items-center gap-1.5 text-sm text-gray-600">
                                    <BarChart3 className="h-4 w-4 text-blue-500" />
                                    Market Cap Change % 24h
                                </span>
                                <span className={`text-sm font-semibold ${(coin.market_cap_change_percentage_24h ?? 0) >= 0 ? "text-green-600" : "text-red-600"}`}>
                                    {formatPercent(coin.market_cap_change_percentage_24h)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-50 px-4 py-3">
                                <span className="flex items-center gap-1.5 text-sm text-gray-600">
                                    <Coins className="h-4 w-4 text-blue-500" />
                                    ROI
                                </span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {coin.roi
                                        ? `${coin.roi.percentage.toFixed(2)}% (${coin.roi.times.toFixed(2)}x ${coin.roi.currency.toUpperCase()})`
                                        : "N/A"}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-50 px-4 py-3 sm:col-span-2">
                                <span className="flex items-center gap-1.5 text-sm text-gray-600">
                                    <RefreshCw className="h-4 w-4 text-blue-500" />
                                    Last Updated
                                </span>
                                <span className="text-sm font-semibold text-gray-900">{formatDate(coin.last_updated)}</span>
                            </div>
                        </div>
                        </article>
                    </>
                ) : (
                    <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                        <p className="text-gray-600">No hay datos disponibles para esta moneda.</p>
                    </div>
                )}
            </section>
        </>
    )
}

export default CoinContainer;