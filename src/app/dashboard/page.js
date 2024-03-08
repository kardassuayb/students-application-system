"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useState, useEffect, Suspense } from "react";
import DataTable from "react-data-table-component";
import { useFetchApplicationsQuery, useUpdateUserMutation } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

const Dashboard = () => {
  const { data, error, isFetching } = useFetchApplicationsQuery();

  const [userId, setUserId] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const userIdParam = searchParams.get("userId");
    if (userIdParam) {
      setUserId(userIdParam);
    }
  }, [searchParams]);

  const [sortBy, setSortBy] = useState("");
  const [filters, setFilters] = useState({
    country: "",
    university: "",
    duration: "",
    costMin: "",
    costMax: "",
    language: "",
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

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
        const country = application.cuntry || "";
        const cost = application.cost
          ? Number(application.cost).toFixed(2)
          : "";
        const deadlineDate = application.deadlineDate || "";
        const duration = application.duration || "";
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

  // TABLE SORTING
  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const sortedData = () => {
    switch (sortBy) {
      case "lowestPrice":
        return [...transformedData].sort((a, b) => a.cost - b.cost);
      case "highestPrice":
        return [...transformedData].sort((a, b) => b.cost - a.cost);
      case "ascendingDeadline":
        return [...transformedData].sort(
          (a, b) => new Date(a.deadlineDate) - new Date(b.deadlineDate)
        );
      case "descendingDeadline":
        return [...transformedData].sort(
          (a, b) => new Date(b.deadlineDate) - new Date(a.deadlineDate)
        );
      default:
        return transformedData;
    }
  };

  const dateSortFunction = (rowA, rowB, columnId) => {
    const dateA = rowA[columnId].replace(/[./: ]/g, "");
    const dateB = rowB[columnId].replace(/[./: ]/g, "");

    return dateA.localeCompare(dateB);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      width: "240px",
    },
    {
      name: "University",
      selector: (row) => row.university,
      width: "240px",
    },
    {
      name: "Country",
      selector: (row) => row.country,
      width: "240px",
    },
    {
      name: "Duration",
      selector: (row) => row.duration,
      cell: (row) => <div>{row.duration}</div>,
      sortFunction: (rowA, rowB) => dateSortFunction(rowA, rowB, "duration"),
    },
    {
      name: "Cost",
      selector: (row) => row.cost,
    },
    {
      name: "Deadline Date",
      selector: (row) => row.deadlineDate,
      cell: (row) => (
        <div className="text-end">{formatDate(row.deadlineDate)}</div>
      ),
      sortFunction: (rowA, rowB) =>
        dateSortFunction(rowA, rowB, "deadlineDate"),
    },
    {
      name: "Language",
      selector: (row) => row.language,
    },
  ];

  // Apply filters
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = sortedData().filter((row) => {
    return (
      Object.entries(filters).every(([filterName, value]) => {
        if (!value) return true;

        switch (filterName) {
          case "country":
          case "university":
          case "duration":
          case "language":
            return row[filterName] === value;
          case "costMin":
            return parseFloat(row.cost) >= parseFloat(value);
          case "costMax":
            return parseFloat(row.cost) <= parseFloat(value);
          default:
            return true;
        }
      }) &&
      Object.values(row).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  // Dropdown options
  const countryOptions = Array.from(
    new Set(transformedData.map((row) => row.country))
  ).sort();
  const universityOptions = Array.from(
    new Set(transformedData.map((row) => row.university))
  ).sort();
  const durationOptions = [
    "1 year",
    "2 years",
    "3 years",
    "4 years",
    "5 years",
    "6 years",
    "7 years",
    "8 years",
  ];

  const languageOptions = Array.from(
    new Set(transformedData.map((row) => row.language))
  ).sort();

  const [showFilters, setShowFilters] = useState(false);

  const filteredItemsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filteredItemsRef.current &&
        !filteredItemsRef.current.contains(event.target)
      ) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleFilters = () => {
    setShowFilters((prevShowFilters) => !prevShowFilters);
  };

  //LOGOUT

  const [processing, setProcessing] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  const handleLogOut = async (e) => {
    setProcessing(true);
    e.preventDefault();

    try {
      const response = await updateUser({ id: userId, isLoggedIn: false });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.log(error.message);
    }
  };

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
    <div className="flex min-h-screen flex-col">
      <header className="flex justify-between py-4 px-8 bg-[#bacddf]">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            <Image src="/jiva3.png" alt="Logo" width={40} height={40} />
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="flex gap-8">
            <li>
              {processing ? (
                <div className="flex justify-between items-center">
                  <div
                    className="animate-spin inline-block border-[3px] border-current border-t-transparent rounded-full w-4 h-4 text-[#825614] text-sm"
                    role="status"
                    aria-label="loading"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-[#825614] text-lg font-semibold flex items-center gap-2"
                  onClick={handleLogOut}
                >
                  Logout
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </Link>
              )}
            </li>
          </ul>
        </div>
      </header>
      <div className="flex flex-col border bg-[#bacddf] border-gray-200 shadow-lg relative">
        <div className="font-medium border bg-white border-gray-200 border-b-0 border-t-0 px-4 py-3 flex flex-row justify-between lg:space-y-0 gap-y-4 lg:flex-row md:flex-col">
          <h5 className="text-lg sm:text-2xl text-gray-600 my-auto mx-auto md:mx-0">
            Student Applications
          </h5>
          <div className="flex md:space-x-2 justify-end items-end md:flex-row flex-col md:space-y-0 gap-y-2">
            <div className="flex relative" ref={filteredItemsRef}>
              <button
                className="flex justify-between items-center w-52 py-1 px-4 border border-gray-200 rounded-sm text-sm focus:border-blue-500 focus:ring-transparent focus:outline-none focus:shadow-sm focus:z-10 h-[2.375rem] text-gray-500"
                onClick={toggleFilters}
              >
                Filter
                <i>
                  <FontAwesomeIcon icon={faChevronDown} />
                </i>
              </button>
              <div
                className={`filtered-items absolute z-20 mt-2 min-w-[12rem] bg-gray-50 shadow-lg border border-gray-200 rounded-sm p-2 top-10 right-0 transition-all ease-in-out delay-500 ${
                  showFilters ? "block" : "hidden"
                } `}
              >
                <div className="flex items-center w-full gap-x-2 py-2 px-2 rounded-sm text-sm text-gray-800 hover:bg-gray-50 focus:ring-0 focus:ring-primary">
                  <input
                    type="text"
                    className="py-1 px-1 w-1/2 border border-gray-200 rounded-sm text-sm focus:border-blue-500 focus:ring-transparent focus:outline-none focus:shadow-sm focus:z-10 h-[2.375rem] text-gray-500"
                    placeholder="    min"
                    value={filters.costMin}
                    onChange={(e) =>
                      handleFilterChange("costMin", e.target.value)
                    }
                  />
                  {"-"}
                  <input
                    type="text"
                    className="py-1 px-1 w-1/2 border border-gray-200 rounded-sm text-sm focus:border-blue-500 focus:ring-transparent focus:outline-none focus:shadow-sm focus:z-10 h-[2.375rem] text-gray-500"
                    placeholder="    max"
                    value={filters.costMax}
                    onChange={(e) =>
                      handleFilterChange("costMax", e.target.value)
                    }
                  />
                </div>
                <div className="flex items-center w-full py-2 px-2 rounded-sm text-sm text-gray-800 hover:bg-gray-50 focus:ring-0 focus:ring-primary">
                  <select
                    className="py-1 px-4 w-full border border-gray-200 rounded-sm text-sm focus:border-blue-500 focus:ring-transparent focus:outline-none focus:shadow-sm focus:z-10 h-[2.375rem] text-gray-500 cursor-pointer"
                    value={filters.country}
                    onChange={(e) =>
                      handleFilterChange("country", e.target.value)
                    }
                  >
                    <option value="">Country</option>
                    {countryOptions.map((country) => (
                      <option
                        className="cursor-pointer"
                        key={country}
                        value={country}
                      >
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center w-full py-2 px-2 rounded-sm text-sm text-gray-800 hover:bg-gray-50 focus:ring-0 focus:ring-primary">
                  <select
                    className="py-1 w-full px-4 border border-gray-200 rounded-sm text-sm focus:border-blue-500 focus:ring-transparent focus:outline-none focus:shadow-sm focus:z-10 h-[2.375rem] text-gray-500 cursor-pointer"
                    value={filters.university}
                    onChange={(e) =>
                      handleFilterChange("university", e.target.value)
                    }
                  >
                    <option value="">University</option>
                    {universityOptions.map((university) => (
                      <option key={university} value={university}>
                        {university}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center w-full py-2 px-2 rounded-sm text-sm text-gray-800 hover:bg-gray-50 focus:ring-0 focus:ring-primary">
                  <select
                    className="py-1 px-4 w-full border border-gray-200 rounded-sm text-sm focus:border-blue-500 focus:ring-transparent focus:outline-none focus:shadow-sm focus:z-10 h-[2.375rem] text-gray-500 cursor-pointer"
                    value={filters.duration}
                    onChange={(e) =>
                      handleFilterChange("duration", e.target.value)
                    }
                  >
                    <option value="">Duration</option>
                    {durationOptions.map((duration) => (
                      <option key={duration} value={duration}>
                        {duration}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center w-full py-2 px-2 rounded-sm text-sm text-gray-800 hover:bg-gray-50 focus:ring-0 focus:ring-primary">
                  <select
                    className="py-1 px-4 w-full border border-gray-200 rounded-sm text-sm focus:border-blue-500 focus:ring-transparent focus:outline-none focus:shadow-sm focus:z-10 h-[2.375rem] text-gray-500 cursor-pointer"
                    value={filters.language}
                    onChange={(e) =>
                      handleFilterChange("language", e.target.value)
                    }
                  >
                    <option value="">Language</option>
                    {languageOptions.map((language) => (
                      <option key={language} value={language}>
                        {language}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <select
              className="py-1 px-4 w-52 border border-gray-200 rounded-sm text-sm focus:border-blue-500 focus:ring-transparent focus:outline-none focus:shadow-sm focus:z-10 h-[2.375rem] text-gray-500 cursor-pointer"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="lowestPrice">Lowest Price</option>
              <option value="highestPrice">Highest Price</option>
              <option value="ascendingDeadline">Ascending Deadline</option>
              <option value="descendingDeadline">Descending Deadline</option>
            </select>
            <div className="flex items-center gap-5 w-52">
              <div className="relative flex rounded-sm">
                <input
                  type="text"
                  className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-blue-500 focus:ring-transparent focus:outline-none focus:shadow-sm pl-4 focus:z-10 h-[2.375rem]"
                  placeholder="Search anything.."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none z-19 pr-4">
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
        </div>
        <div className="bg-white border border-gray-200 rounded-b-md">
          {isFetching ? (
            <div className="border rounded-sm shadow-sm p-6">
              <div className="flex animate-pulse">
                <div className="ml-4 mt-2 w-full">
                  <ul className="mt-5 space-y-3">
                    {[...Array(10)].map((_, index) => (
                      <li
                        key={index}
                        className="w-full h-8 bg-gray-200 rounded-sm"
                      ></li>
                    ))}
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
