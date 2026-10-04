import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { doctors, currencySymbol } = useContext(AppContext);
  const navigate = useNavigate();

  const specialitiesList = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const applyFilter = () => {
    let result = doctors;
    if (speciality) {
      result = result.filter((doc) => doc.speciality === speciality);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (doc) =>
          doc.name.toLowerCase().includes(q) ||
          doc.speciality.toLowerCase().includes(q)
      );
    }
    setFilterDoc(result);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, searchQuery]);

  return (
    <div className="py-6 sm:py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-50/50 via-white to-slate-50/50 rounded-2xl p-5 sm:p-7 border border-teal-100/60 mb-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-white border border-teal-200/60 text-[#0D9488] text-[10px] font-semibold tracking-wider uppercase mb-1.5 shadow-2xs">
              Doctor Directory
            </span>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
              {speciality ? `${speciality} Specialists` : "All Certified Doctors"}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Showing {filterDoc.length} verified doctors available for booking.
            </p>
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-72">
            <div className="relative">
              <input
                type="text"
                placeholder="Search doctor or speciality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-7 py-2 rounded-full border border-gray-200 focus:border-[#0D9488] focus:ring-1 focus:ring-teal-100 outline-none text-xs sm:text-sm bg-white shadow-2xs transition-all"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                🔍
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Mobile Filter Toggle */}
        <button
          className={`py-1.5 px-4 border rounded-full text-xs font-semibold transition-all lg:hidden flex items-center gap-1.5 ${
            showFilter
              ? "bg-[#0D9488] text-white border-[#0D9488]"
              : "bg-white text-gray-700 border-gray-200"
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          <span>Filters</span>
          <span>{showFilter ? "✕" : "⚙️"}</span>
        </button>

        {/* Sidebar Filters */}
        <aside
          className={`w-full lg:w-60 flex-col gap-2 text-xs ${
            showFilter ? "flex" : "hidden lg:flex"
          }`}
        >
          <div className="p-3.5 bg-white rounded-2xl border border-gray-150 shadow-2xs flex flex-col gap-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 px-2">
              Categories
            </p>

            <button
              onClick={() => navigate("/doctors")}
              className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all flex items-center justify-between ${
                !speciality
                  ? "bg-[#0D9488] text-white font-semibold shadow-xs"
                  : "text-gray-700 hover:bg-teal-50/60 hover:text-[#0D9488]"
              }`}
            >
              <span>All Specialties</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${!speciality ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"}`}>
                {doctors.length}
              </span>
            </button>

            {specialitiesList.map((item, index) => {
              const count = doctors.filter((d) => d.speciality === item).length;
              const isSelected = speciality === item;
              return (
                <button
                  key={index}
                  onClick={() =>
                    isSelected ? navigate("/doctors") : navigate(`/doctors/${item}`)
                  }
                  className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-[#0D9488] text-white font-semibold shadow-xs"
                      : "text-gray-700 hover:bg-teal-50/60 hover:text-[#0D9488]"
                  }`}
                >
                  <span className="truncate">{item}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Doctor Grid */}
        <main className="w-full flex-1">
          {filterDoc.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-150 p-10 text-center max-w-sm mx-auto shadow-2xs">
              <h3 className="text-base font-bold text-gray-900 mb-1">
                No doctors found
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Try selecting a different specialty or clearing your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  navigate("/doctors");
                }}
                className="bg-[#0D9488] text-white px-5 py-2 rounded-full text-xs font-semibold hover:bg-[#0f766e] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filterDoc.map((item, index) => (
                <div
                  onClick={() => {
                    navigate(`/appointment/${item._id}`);
                    scrollTo(0, 0);
                  }}
                  key={index}
                  className="bg-white rounded-2xl border border-gray-150 shadow-2xs hover:shadow-md hover:border-teal-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-52 sm:h-48 md:h-52 bg-blue-50 overflow-hidden">
                    <img
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      src={item.image}
                      alt={item.name}
                    />

                    {/* Availability Tag */}
                    <div className="absolute top-2.5 left-2.5">
                      <div
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold backdrop-blur-md shadow-xs ${
                          item.available
                            ? "bg-white/95 text-emerald-700"
                            : "bg-white/95 text-rose-600"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.available
                              ? "bg-emerald-500"
                              : "bg-rose-500"
                          }`}
                        ></span>
                        <span>{item.available ? "Available" : "Unavailable"}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-2.5 right-2.5 bg-gray-900/70 backdrop-blur-md text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="text-amber-400">★</span>
                      <span>4.9</span>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-[#0D9488] uppercase tracking-wider mb-0.5">
                        {item.speciality}
                      </p>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#0D9488] transition-colors truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">
                        {item.degree || "MBBS"} • {item.experience || "5 Yrs"}
                      </p>
                    </div>

                    {/* Card Bottom */}
                    <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block">
                          Fee
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-gray-900">
                          {currencySymbol || "$"}{item.fees || 50}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0D9488] group-hover:translate-x-0.5 transition-transform">
                        <span>Book</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Doctors;
