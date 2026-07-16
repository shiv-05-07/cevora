'use client';

import * as React from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown, Loader2, Inbox } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export interface ColumnDef<T> {
  key: string;
  header: string;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  loading?: boolean;
  emptyState?: React.ReactNode;
  pagination?: {
    pageSize?: number;
  };
  className?: string;
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  loading = false,
  emptyState,
  pagination,
  className
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const pageSize = pagination?.pageSize || 10;
  const showPagination = !!pagination;

  // Sorting
  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = (a as any)[sortConfig.key];
        const bValue = (b as any)[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = showPagination
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="rounded-xl border border-border/80 dark:border-border/40 overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent">
                {columns.map((col) => (
                  <TableHead 
                    key={col.key} 
                    className={cn(
                      "text-xs font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap",
                      col.sortable && "cursor-pointer select-none hover:text-foreground transition-colors",
                      col.className
                    )}
                    onClick={() => col.sortable ? requestSort(col.key) : undefined}
                  >
                    <div className="flex items-center gap-1">
                      {col.header}
                      {col.sortable && (
                        <div className="flex flex-col opacity-50">
                          {sortConfig?.key === col.key ? (
                            sortConfig.direction === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                          ) : (
                            <ChevronsUpDown className="w-3 h-3" />
                          )}
                        </div>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <Loader2 className="w-6 h-6 animate-spin mb-2 text-primary" />
                      <span className="text-sm font-medium">Loading data...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-48">
                    {emptyState || (
                      <EmptyState
                        icon={Inbox}
                        title="No results found"
                        description="There is no data to display matching your criteria."
                      />
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, rowIndex) => (
                  <TableRow key={row.id || rowIndex}>
                    {columns.map((col) => (
                      <TableCell key={col.key} className={col.className}>
                        {col.cell ? col.cell(row) : (row as any)[col.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Controls */}
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <p className="text-xs text-muted-foreground font-medium hidden sm:block">
            Showing <span className="font-bold text-foreground">{(currentPage - 1) * pageSize + 1}</span> to <span className="font-bold text-foreground">{Math.min(currentPage * pageSize, sortedData.length)}</span> of <span className="font-bold text-foreground">{sortedData.length}</span> results
          </p>
          <Pagination className="justify-end w-auto mx-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={cn("cursor-pointer select-none", currentPage === 1 && "pointer-events-none opacity-50")} 
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i} className="hidden sm:inline-block">
                  <PaginationLink 
                    onClick={() => handlePageChange(i + 1)}
                    isActive={currentPage === i + 1}
                    className="cursor-pointer select-none"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={cn("cursor-pointer select-none", currentPage === totalPages && "pointer-events-none opacity-50")}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
