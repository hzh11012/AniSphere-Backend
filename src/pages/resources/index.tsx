import React, { useCallback, useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { DataTable } from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/resources/columns';
import { useResourcesStore } from '@/store';
import { useRequest } from 'ahooks';
import { getResourcesList } from '@/apis';
import DataTableSearch from '@/components/custom/data-table/data-table-search';
import DataTableRefresh from '@/components/custom/data-table/data-table-refresh';

const Index: React.FC = () => {
  const {
    initialized,
    setInitialized,
    data,
    setData,
    hasMore,
    setHasMore,
    keyword,
    setKeyword,
    page,
    pageSize,
    resetPagination,
    pagination,
    setPagination,
    sizes
  } = useResourcesStore(
    useShallow(state => ({
      initialized: state.initialized,
      setInitialized: state.setInitialized,
      data: state.data,
      setData: state.setData,
      hasMore: state.hasMore,
      setHasMore: state.setHasMore,
      keyword: state.keyword,
      setKeyword: state.setKeyword,
      page: state.page,
      pageSize: state.pageSize,
      resetPagination: state.resetPagination,
      pagination: state.pagination,
      setPagination: state.setPagination,
      sizes: state.sizes
    }))
  );

  const columns = useMemo(() => getColumns(), []);

  useEffect(() => {
    return () => {
      resetPagination();
      setHasMore(false);
      setInitialized(false);
      setData([]);
    };
  }, [resetPagination, setHasMore, setInitialized, setData]);

  const { run, loading, refresh, error } = useRequest(getResourcesList, {
    loadingDelay: 150,
    debounceWait: 250,
    defaultParams: [{ page, pageSize }],
    onSuccess: ({ items, hasMore }) => {
      setData(items);
      setHasMore(hasMore);
    },
    onFinally: () => {
      setInitialized(true);
    },
    refreshDeps: [page, pageSize],
    refreshDepsAction: () => {
      run({ page, keyword, pageSize });
    }
  });

  const handleSearch = useCallback(
    (keyword: string) => {
      resetPagination();
      setKeyword(keyword);
      run({ page: 1, keyword, pageSize });
    },
    [resetPagination, setKeyword, run, pageSize]
  );

  const isLoading = loading || !initialized;

  return (
    <DataTable
      data={data}
      columns={columns}
      loading={isLoading}
      pagination={pagination}
      paginationConfig={{ mode: 'hasMore', hasMore }}
      onPaginationChange={setPagination}
      sizes={sizes}
      error={!!error}
      toolbar={
        <>
          <DataTableSearch
            onSearch={handleSearch}
            disabled={isLoading}
          />
          <DataTableRefresh
            onRefresh={refresh}
            disabled={isLoading}
          />
        </>
      }
    />
  );
};

export default Index;
