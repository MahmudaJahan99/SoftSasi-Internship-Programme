# React Query

Traditionally, data fetching from an API is done using useEffect, useState, and the browser's fetch API. While this approach works, it often leads to repetitive code for handling loading states, error handling, caching, and refetching data.

A typical React component that fetches users might contain several pieces of state:

- User data
- Loading state
- Error state

In addition, the component needs to manage API calls, handle failures, and ensure that loading indicators appear at the correct times. As applications grow, this pattern becomes repetitive and difficult to maintain.

Another challenge is that multiple components may request the same data, resulting in duplicate API calls and unnecessary network traffic. Managing data freshness and synchronization across components can quickly become complex.


React Query was created to solve these server-state management problems. Unlike local UI state, server state comes from an external source and can become stale over time. Instead of manually managing fetch lifecycles, developers can focus on rendering UI while React Query handles the underlying data management. React Query provides a dedicated solution for managing this type of state by offering:

- Automatic caching
- Request deduplication
- Background refetching
- Built-in loading and error handling
- Data synchronization across components
- Improved developer experience


```
const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
});
```