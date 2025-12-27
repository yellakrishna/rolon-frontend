import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext.jsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./FoodTable.css";

const FoodTable = () => {
  const { food_list } = useContext(StoreContext);
  const [monthFilter, setMonthFilter] = useState(""); // "1", "3", "6", "12"
  const [searchQuery, setSearchQuery] = useState(""); // single search input
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate data fetching
  useEffect(() => {
    if (food_list && food_list.length > 0) {
      setLoading(false);
    }
  }, [food_list]);

  // Sort by date descending
  const sortedList = [...food_list].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  // Filter based on month and search input
  const filteredFoodList = sortedList.filter((item) => {
    if (!item.date) return false;
    const dateObj = new Date(item.date);
    const today = new Date();

    let monthMatch = true;
    if (monthFilter) {
      const pastDate = new Date();
      pastDate.setMonth(today.getMonth() - parseInt(monthFilter));
      monthMatch = dateObj >= pastDate && dateObj <= today;
    }

    let searchMatch = true;
    if (searchQuery) {
      const search = searchQuery.toLowerCase();
      const formattedDate = dateObj.toLocaleDateString("en-GB");
      searchMatch =
        formattedDate.includes(search) ||
        item.tagNo?.toLowerCase().includes(search) ||
        item.plantName?.toLowerCase().includes(search) ||
        item.reason?.toLowerCase().includes(search) ||
        item.action?.toLowerCase().includes(search) ||
        item.remark?.toLowerCase().includes(search);
    }

    return monthMatch && searchMatch;
  });

  // PDF download
  const downloadPDF = () => {
    const doc = new jsPDF();
    const filterText = monthFilter
      ? ` - Last ${monthFilter} month${monthFilter > 1 ? "s" : ""}`
      : "";
    doc.text(`Seal Failure Report${filterText}`, 14, 15);

    const tableColumn = [
      "S.No",
      "Date & Time",
      "Tag No",
      "Plant Name",
      "Reason",
      "Action",
      "Remark",
    ];

    const tableRows = filteredFoodList.map((item, index) => [
      index + 1,
      item.date
        ? new Date(item.date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "-",
      item.tagNo || "-",
      item.plantName || "-",
      item.reason || "-",
      item.action || "-",
      item.remark || "-",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.save("seal-failure-report.pdf");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading records...</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <h2 className="table-heading">Seal Failure Report</h2>

      <div className="table-controls">
        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="search-input"
        >
          <option value="">All Records</option>
          <option value="1">Last 1 Month</option>
          <option value="3">Last 3 Months</option>
          <option value="6">Last 6 Months</option>
          <option value="12">Last 12 Months</option>
        </select>

        <input
          type="text"
          placeholder="Search text or date (DD/MM/YYYY)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <button type="button" onClick={downloadPDF} className="download-btn">
          Download PDF
        </button>
      </div>

      <table className="word-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Date & Time</th>
            <th>Tag No</th>
            <th>Plant Name</th>
            <th>Reason</th>
            <th>Action</th>
            <th>Remark</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {filteredFoodList.length ? (
            filteredFoodList.map((item, index) => (
              <tr
                key={item._id}
                onClick={() => navigate(`/food/${item._id}`)}
                style={{ cursor: "pointer" }}
              >
                <td>{index + 1}</td>
                <td>
                  {item.date
                    ? new Date(item.date).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "-"}
                </td>
                <td>{item.tagNo || "-"}</td>
                <td>{item.plantName || "-"}</td>
                <td>{item.reason || "-"}</td>
                <td>{item.action || "-"}</td>
                <td>{item.remark || "-"}</td>
                <td>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.tagNo}
                      className="table-img"
                    />
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="error-cell">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FoodTable;
