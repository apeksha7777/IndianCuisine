import { getCoreRowModel, useReactTable, flexRender,getPaginationRowModel, getSortedRowModel, } from '@tanstack/react-table';
import type { ColumnDef,SortingState } from '@tanstack/react-table';
import { useState } from 'react';

interface ReactTableProps<T extends object> {
 data: T[];
 columns: ColumnDef<T>[];
 showFooter?: boolean;
 showNavigation?: boolean;
}

export const Table = <T extends object>({ data, columns,showFooter = true, showNavigation = true, }: ReactTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([])
 const table = useReactTable({
   data,
   columns,
   state: {
    sorting,
  },
  onSortingChange: setSorting,
   getCoreRowModel: getCoreRowModel(),
   getSortedRowModel: getSortedRowModel(),
   getPaginationRowModel: getPaginationRowModel(),
 });

 console.log(data,'ssss')
 return (
  <div className="flex flex-col">
     <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
       <div className="inline-block min-w-full py-4 sm:px-6 lg:px-8">
         <div className="overflow-hidden p-2">
         {showNavigation ? (
             <>
               <div className="h-2 mt-5" />
               <div className="flex items-center gap-2">
               
                 <button
                   className="cursor-pointer rounded border p-1 m-5"
                   onClick={() => table.previousPage()}
                   disabled={!table.getCanPreviousPage()}
                 >
                   {'<'}
                 </button>
                 <button
                   className="cursor-pointer rounded border p-1"
                   onClick={() => table.nextPage()}
                   disabled={!table.getCanNextPage()}
                 >
                   {'>'}
                 </button>
               
                 <span className="flex cursor-pointer items-center gap-1">
                   
                   <strong>
                     {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                   </strong>
                 </span>
                 <span className="flex items-center gap-1">
                   | Go to page:
                   <input
                     type="number"
                     defaultValue={table.getState().pagination.pageIndex + 1}
                     onChange={(e) => {
                       const page = e.target.value ? Number(e.target.value) - 1 : 0;
                       table.setPageIndex(page);
                     }}
                     className="w-16 rounded border p-1"
                   />
                 </span>
                 <select
                   value={table.getState().pagination.pageSize}
                   onChange={(e) => {
                     table.setPageSize(Number(e.target.value));
                   }}
                 >
                   {[10, 20, 30, 40, 50].map((pageSize) => (
                     <option key={pageSize} value={pageSize}>
                       Show {pageSize}
                     </option>
                   ))}
                 </select>
                 <div className="h-4" />
               </div>
             </>
           ) : null}
           <table className="min-w-full text-center">
            
             <thead className="border-b bg-gray-50">
               {table.getHeaderGroups().map((headerGroup) => (
                 <tr key={headerGroup.id}>
                   {headerGroup.headers.map((header) => (
                     <th key={header.id} className="px-6 py-4 text-sm font-medium text-gray-900">
                       {header.isPlaceholder ? null :  (<div
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === 'asc'
                              ? 'Sort ascending'
                              : header.column.getNextSortingOrder() === 'desc'
                                ? 'Sort descending'
                                : 'Clear sort'
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>)}
                     </th>
                   ))}
                 </tr>
               ))}
             </thead>
             <tbody>
               {table.getRowModel().rows.map((row) => (
                 <tr key={row.id} className='border-b" bg-white'>
                   {row.getVisibleCells().map((cell) => (
                     <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900" key={cell.id}>
                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
                     </td>
                   ))}
                 </tr>
               ))}
             </tbody>
            
           </table>
         </div>
       </div>
     </div>
   </div>
 );
};