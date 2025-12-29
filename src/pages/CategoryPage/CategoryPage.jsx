import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { food_list } = useContext(StoreContext);

  const [monthFilter, setMonthFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Check login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Stop loading once food_list arrives (even if empty)
  useEffect(() => {
    if (food_list) {
      setLoading(false);
    }
  }, [food_list]);

  // ✅ FIXED: Safe category filter (handles spaces + case)
  const categoryItems = food_list.filter(
    (item) =>
      item.category?.trim().toLowerCase() ===
      categoryName?.trim().toLowerCase()
  );

  // ✅ Sorting + filtering
  const filteredItems = [...categoryItems]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter((item) => {
      const dateObj = new Date(item.date);
      const today = new Date();

      let monthMatch = true;
      if (monthFilter) {
        const pastDate = new Date();
        pastDate.setMonth(today.getMonth() - Number(monthFilter));
        monthMatch = dateObj >= pastDate && dateObj <= today;
      }

      let searchMatch = true;
      if (searchQuery) {
        const search = searchQuery.toLowerCase().trim();
        const formattedDate = dateObj.toLocaleDateString("en-GB");

        searchMatch =
          formattedDate.includes(search) ||
          item.plantName?.toLowerCase().includes(search) ||
          item.tagNo?.toLowerCase().includes(search);
      }

      return monthMatch && searchMatch;
    });

  // ✅ Download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`${categoryName} - Seal Failure Report`, 14, 15);

    const tableColumn = [
      "S.No",
      "Date",
      "Tag No",
      "Plant Name",
      "Problem",
      "Services",
      "Remark",
    ];

    const tableRows = filteredItems.map((item, index) => [
      index + 1,
      item.date
        ? new Date(item.date).toLocaleDateString("en-GB")
        : "-",
      item.tagNo || "-",
      item.plantName || "-",
      item.action || "-",
      item.reason || "-",
      item.remark || "-",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    });

    doc.save(`${categoryName}-report.pdf`);
  };

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="category-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2 className="category-title">FULL DETAILS</h2>
        <p className="item-count">{filteredItems.length} items found</p>
      </div>

      <div className="table-controls">
        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="search-input"
        >
          <option value="">All Months</option>
          <option value="1">Last 1 Month</option>
          <option value="3">Last 3 Months</option>
          <option value="6">Last 6 Months</option>
          <option value="12">Last 12 Months</option>
        </select>

        <input
          type="text"
          placeholder="Search Date, Plant Name, Tag No"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <button onClick={downloadPDF} className="download-btn">
          Download PDF
        </button>
      </div>

      <div className="category-table-container">
        {filteredItems.length > 0 ? (
          <table className="category-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Tag No</th>
                <th>Plant Name</th>
                <th>Problem</th>
                <th>Services</th>
                <th>Remark</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr
                  key={item._id}
                  onClick={() => navigate(`/food/${item._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{index + 1}</td>
                  <td>
                    {item.date
                      ? new Date(item.date).toLocaleDateString("en-GB")
                      : "-"}
                  </td>
                  <td>{item.tagNo || "-"}</td>
                  <td>{item.plantName || "-"}</td>
                  <td>{item.action || "-"}</td>
                  <td>{item.reason || "-"}</td>
                  <td>{item.remark || "-"}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    {item.image && <img src={item.image} alt="Food" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-items-found">
            <p>😕 No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
