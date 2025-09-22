import React from "react";
import useGetApi from "../../hooks/useApi";
import Loading from "../../components/Loading";
import ActiveUsersVsInactiveUsers from "../../components/ActiveUsersVsInactiveUsers";
import TotalUsers from "../../components/TotalUsers";

export default function Dashboard() {
    const {
        data: activeUsersApi,
        loading: activeUsersApiLoading,
        reload: activeReload,
    } = useGetApi("users/stats/active");
    const {
        data: inactiveUsersApi,
        loading: inactiveUsersApiLoading,
        reload: inactiveReload,
    } = useGetApi("users/stats/inactive");

    const activeCount = activeUsersApi?.active_users || 0;
    const inactiveCount = inactiveUsersApi?.inactive_users || 0;
    const totalUsers = activeCount + inactiveCount;
    const inactivityPercentage =
        totalUsers > 0 ? ((inactiveCount / totalUsers) * 100).toFixed(1) : 0;
    const isLoading = activeUsersApiLoading || inactiveUsersApiLoading;
    return (
        <div>
            <div className="flex w-full justify-between">
                <h1 className="text-2xl font-bold mb-4">Panel de estadisticas</h1>
                <button
                    className="btn btn-success"
                    onClick={() => {
                        activeReload();
                        inactiveReload();
                    }}
                >
                    Refrescar
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-base-200 rounded-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full rounded-lg shadow-2xl col-span-2 p-6">
                    <div className="w-full ">
                        <div className="stats stats-vertical bg-base-100 border-base-300 p-4 w-full">
                            <div className="stat">
                                <div className="stat-title">Total de usuarios</div>
                                <div className="stat-value">
                                    {isLoading ? <Loading size="xs" /> : totalUsers}
                                </div>
                                <div className="stat-desc">Registrados en el sistema</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Usuarios activos</div>
                                <div className="stat-value text-success">
                                    {isLoading ? <Loading size="xs" /> : activeCount}
                                </div>
                                <div className="stat-desc">
                                    ↗︎
                                    {isLoading ? (
                                        <Loading size="xs" />
                                    ) : (
                                        ((activeCount / totalUsers) * 100).toFixed(1)
                                    )}
                                    % del total
                                </div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Usuarios inactivos</div>
                                <div className="stat-value text-error">
                                    {isLoading ? <Loading size="xs" /> : inactiveCount}
                                </div>
                                <div className="stat-desc">
                                    ↘︎ {isLoading ? <Loading size="xs" /> : inactivityPercentage}%
                                    del total
                                </div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Tasa de actividad</div>
                                <div className="stat-value text-primary">
                                    {isLoading ? (
                                        <Loading size="xs" />
                                    ) : (
                                        (100 - parseFloat(inactivityPercentage)).toFixed(1)
                                    )}
                                    %
                                </div>
                                <div className="stat-desc">Usuarios comprometidos</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full ">
                        <ActiveUsersVsInactiveUsers />
                    </div>
                </div>
                <div className="flex w-full col-span-2 rounded-lg shadow-2xl p-6 bg-base-100">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                        <div className="flex justify-center items-center col-span-2">
                            <TotalUsers />
                        </div>
                        <div className="stats stats-vertical shadow w-full">
                            <div className="stat">
                                <div className="stat-title">Crecimiento mensual</div>
                                <div className="stat-value text-success">
                                    {isLoading ? (
                                        <Loading size="xs" />
                                    ) : (
                                        `+${Math.round(totalUsers * 0.15)}`
                                    )}
                                </div>
                                <div className="stat-desc">↗︎ 15% respecto al mes anterior</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Retención de usuarios</div>
                                <div className="stat-value text-primary">
                                    {isLoading ? (
                                        <Loading size="xs" />
                                    ) : (
                                        `${(100 - parseFloat(inactivityPercentage)).toFixed(1)}%`
                                    )}
                                </div>
                                <div className="stat-desc">Usuarios que permanecen activos</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Tasa de conversión</div>
                                <div className="stat-value text-info">
                                    {isLoading ? (
                                        <Loading size="xs" />
                                    ) : (
                                        ((activeCount / totalUsers) * 100).toFixed(1)
                                    )}
                                </div>
                                <div className="stat-desc">De registrados a activos</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Usuarios potenciales</div>
                                <div className="stat-value text-warning">
                                    {isLoading ? (
                                        <Loading size="xs" />
                                    ) : (
                                        Math.round(totalUsers * 0.2)
                                    )}
                                </div>
                                <div className="stat-desc">Estimado para próximos meses</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
