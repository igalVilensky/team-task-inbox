import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  SidebarContainer,
  StatCard,
  StatTitle,
  StatValue,
} from "./StatsSidebar.styles";

import { fetchStats } from "../../store/actions/statsActions";
import {
  selectStats,
  selectStatsLoading,
} from "../../store/selectors/statsSelectors";

const StatsSidebar = () => {
  const dispatch = useDispatch();

  const stats = useSelector(selectStats);
  const loading = useSelector(selectStatsLoading);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  if (loading) return <SidebarContainer>Loading stats...</SidebarContainer>;

  return (
    <SidebarContainer>
      <StatCard>
        <StatTitle>Total Tasks</StatTitle>
        <StatValue>{stats?.totalTasks || 0}</StatValue>
      </StatCard>

      {stats?.byStatus &&
        Object.entries(stats.byStatus).map(([status, count]) => (
          <StatCard key={status}>
            <StatTitle>{status.replace("-", " ")}</StatTitle>
            <StatValue>{count}</StatValue>
          </StatCard>
        ))}
    </SidebarContainer>
  );
};

export default StatsSidebar;
