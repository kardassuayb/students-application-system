"use client";

import { useState } from "react";
import DataTable from "react-data-table-component";
import { useFetchApplicationsQuery } from "../store";

const Dashboard = () => {
  const { data, error, isFetching } = useFetchApplicationsQuery();
  console.log(data);

  // TARİH FORMAT DEĞİŞİKLİĞİ
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    const date = new Date(dateString);
    return date
      .toLocaleDateString("tr-TR", options)
      .replace(".", "/")
      .replace(".", "/");
  };

  const transformedData = data
    ? data.map((application) => {
        const name = application.name || "";
        const university = application.university || "";
        const country = application.country || "";
        const cost = application.cost
          ? Number(application.cost).toFixed(2)
          : "";
        const deadlineDate = application.deadlineDate || "";
        const duration = application.deadlineDate
          ? application.deadlineDate - new Date()
          : "";
        const language = application.language || "";
        const applicationId = application.id;

        return {
          name,
          university,
          country,
          cost,
          deadlineDate,
          duration,
          language,
          applicationId,
        };
      })
    : [];

  // TARİH SIRALAMA FONKSİYONU
  const dateSortFunction = (rowA, rowB, columnId) => {
    const dateA = rowA[columnId].replace(/[./: ]/g, "");
    const dateB = rowB[columnId].replace(/[./: ]/g, "");

    return dateA.localeCompare(dateB);
  };

  const columns = [
    {
      name: "Name",
      sortable: true,
      selector: (row) => row.name,
      width: "200px",
    },
    {
      name: "University",
      sortable: true,
      selector: (row) => row.university,
    },
    {
      name: "Country",
      sortable: true,
      selector: (row) => row.country,
      width: "150px",
    },
    {
      name: "Duration",
      sortable: true,
      selector: (row) => row.duration,
      cell: (row) => <div>{formatDate(row.duration)}</div>,
      sortFunction: (rowA, rowB) => dateSortFunction(rowA, rowB, "duration"),
    },
    {
      name: "Cost",
      sortable: true,
      selector: (row) => row.cost,
      right: true,
    },
    {
      name: "Deadline Date",
      sortable: true,
      right: true,
      selector: (row) => row.deadlineDate,
      cell: (row) => <div>{formatDate(row.deadlineDate)}</div>,
      sortFunction: (rowA, rowB) =>
        dateSortFunction(rowA, rowB, "deadlineDate"),
    },
    {
      name: "Language",
      sortable: true,
      selector: (row) => row.language,
    },
  ];

  // ÜRÜN ARAMA
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = transformedData.filter((row) => {
    const searchableColumns = [
      "name",
      "university",
      "country",
      "cost",
      "deadlineDate",
      "duration",
      "language",
    ];

    return searchableColumns.some((column) => {
      const cellValue = String(row[column]).toLowerCase();
      return cellValue.includes(searchTerm.toLowerCase());
    });
  });

  // TABLO STİLLERİ
  const textColor = "#56606b";
  const tableStyles = {
    headRow: {
      style: {
        fontWeight: "bold",
        fontSize: "12px",
        backgroundColor: "#FFFFFF",
        borderRadius: "5px",
        textTransform: "uppercase",
      },
    },
    rows: {
      style: {
        backgroundColor: "#FFFFFF",
        color: textColor,
      },
      stripedStyle: {
        color: "#56606b",
        backgroundColor: "#F1F3FA",
      },
      highlightOnHoverStyle: {
        color: textColor,
        backgroundColor: "#EEEEEE",
        transitionDuration: "0.15s",
        transitionProperty: "background-color",
        borderBottomColor: "rgba(0,0,0,.12)",
        outlineColor: "rgba(0,0,0,.12)",
      },
    },
    cells: {
      style: {
        fontSize: "13px",
        width: "auto",
      },
    },
    pagination: {
      style: {
        fontWeight: "semi-bold",
        color: textColor,
        fontSize: "14px",
        borderRadius: "5px",
        backgroundColor: "#FFFFFF",
      },
      pageButtonsStyle: {
        color: "rgba(0,0,0,.54)",
      },
    },
  };

  return (
    <div>
      <div className="flex flex-col border bg-white border-gray-200 shadow-lg mb-6 relative p-4">
        <div className="font-medium border border-gray-200 border-b-0 rounded-t-sm px-4 py-3 lg:flex lg:justify-end space-y-2 ">
          <div className="flex items-center gap-5 justify-end lg:justify-normal">
            <div className="relative flex rounded-sm">
              <input
                type="text"
                className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm pl-4 focus:z-10 h-[2.375rem]"
                placeholder="Search anything.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
                <svg
                  className="h-4 w-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 border border-gray-200">
          {isFetching ? (
            <div className="border rounded-sm shadow-sm p-6">
              <div className="flex animate-pulse">
                <div className="ml-4 mt-2 w-full">
                  <ul className="mt-5 space-y-3">
                    <li className="w-full h-8 bg-gray-200 rounded-sm"></li>
                    <li className="w-full h-8 bg-gray-200 rounded-sm"></li>
                    <li className="w-full h-8 bg-gray-200 rounded-sm"></li>
                    <li className="w-full h-8 bg-gray-200 rounded-sm"></li>
                    <li className="w-full h-8 bg-gray-200 rounded-sm"></li>
                    <li className="w-full h-8 bg-gray-200 rounded-sm"></li>
                    <li className="w-full h-8 bg-gray-200 rounded-sm"></li>
                    <li className="w-full h-8 bg-gray-200 rounded-sm"></li>
                    <li className="w-full h-8 bg-gray-200 rounded-sm"></li>
                    <li className="w-full h-8 bg-gray-200 rounded-sm"></li>
                  </ul>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col border bg-white border-gray-200 shadow-lg rounded-sm mb-6 relative">
              <div
                className="bg-yellow-50 border border-yellow-200 alert mb-0"
                role="alert"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-4 w-4 text-yellow-400 mt-0.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  </div>
                  <div className="ml-2">
                    <h3 className="text-sm text-yellow-800 font-semibold">
                      Cannot connect to the database
                    </h3>
                    <div className="mt-1 text-sm text-yellow-700">
                      We are unable to save any progress at this time.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredData}
              customStyles={tableStyles}
              fixedHeader
              fixedHeaderScrollHeight="540px"
              persistTableHead
              striped
              selectableRowsVisibleOnly
              selectableRowsHighlight
              highlightOnHover
              pagination
              paginationComponentOptions={{
                selectAllRowsItem: true,
                selectAllRowsItemText: "All",
              }}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
