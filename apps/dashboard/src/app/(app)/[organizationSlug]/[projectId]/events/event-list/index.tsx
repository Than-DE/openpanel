import withSuspense from '@/hocs/with-suspense';

import { getEventList, getEventsCount } from '@openpanel/db';
import type { IChartEventFilter } from '@openpanel/validation';

import EventList from './event-list';

type Props = {
  cursor?: number;
  projectId: string;
  filters?: IChartEventFilter[];
  eventNames?: string[];
};

const EventListServer = async ({
  cursor,
  projectId,
  eventNames,
  filters,
}: Props) => {
  const [events, count] = await Promise.all([
    getEventList({
      cursor,
      projectId,
      take: 50,
      events: eventNames,
      filters,
    }),
    getEventsCount({
      projectId,
      events: eventNames,
      filters,
    }),
  ]);

  return <EventList data={events} count={count} />;
};

export default withSuspense(EventListServer, () => (
  <div className="flex flex-col gap-2">
    <div className="card h-[74px] w-full animate-pulse items-center justify-between rounded-lg p-4"></div>
    <div className="card h-[74px] w-full animate-pulse items-center justify-between rounded-lg p-4"></div>
    <div className="card h-[74px] w-full animate-pulse items-center justify-between rounded-lg p-4"></div>
    <div className="card h-[74px] w-full animate-pulse items-center justify-between rounded-lg p-4"></div>
    <div className="card h-[74px] w-full animate-pulse items-center justify-between rounded-lg p-4"></div>
  </div>
));
