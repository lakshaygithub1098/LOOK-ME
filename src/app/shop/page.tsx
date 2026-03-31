"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { products, categories, fabrics, searchProducts, sizes } from "@/lib/products";

const ITEMS_PER_PAGE = 9;
type FilterSection = "category" | "price" | "size" | "fabric";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter");
  const categoryParam = searchParams.get("category");
  const queryParam = searchParams.get("q") ?? "";

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFabric, setSelectedFabric] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(4000);
  const [sortBy, setSortBy] = useState("default");
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [openSections, setOpenSections] = useState<FilterSection[]>(["category", "price", "size", "fabric"]);

  useEffect(() => {
    if (categoryParam && categoryParam !== "All") setSelectedCategories([categoryParam]);
    if (filterParam === "summer") setSelectedCategories(["Summer"]);
    if (filterParam === "new") setSelectedCategories([]);
  }, [filterParam, categoryParam]);

  const toggleSection = (section: FilterSection) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const toggleFilter = (
    setArr: React.Dispatch<React.SetStateAction<string[]>>,
    val: string
  ) => {
    setArr((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
    setPage(1);
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedFabric([]);
    setSelectedSizes([]);
    setMaxPrice(4000);
    setSortBy("default");
    setPage(1);
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (filterParam === "new") result = result.filter((p) => p.isNew);
    if (filterParam === "summer") result = result.filter((p) => p.isSummer);
    if (filterParam === "sale") result = result.filter((p) => !!p.originalPrice);
    if (selectedCategories.length > 0) result = result.filter((p) => selectedCategories.includes(p.category));
    if (selectedFabric.length > 0) result = result.filter((p) => selectedFabric.includes(p.fabric));
    if (selectedSizes.length > 0) result = result.filter((p) => selectedSizes.some((s) => p.sizes.includes(s)));
    if (queryParam.trim()) result = searchProducts(queryParam, result);
    result = result.filter((p) => p.price <= maxPrice);
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [selectedCategories, selectedFabric, selectedSizes, maxPrice, sortBy, filterParam, queryParam]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const pageTitle = filterParam === "new" ? "NEW ARRIVALS"
    : filterParam === "summer" ? "SUMMER PICKS"
    : filterParam === "sale" ? "SALE"
    : queryParam ? `SEARCH: ${queryParam}`
    : "ALL PRODUCTS";

  const FilterPanel = () => (
    <aside className="filters" style={{ minWidth: "230px", maxWidth: "250px" }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold tracking-widest uppercase" style={{ color: "var(--text-primary)", fontFamily: "'Inter', sans-serif" }}>
          Filters
        </h3>
        {(selectedCategories.length > 0 || selectedFabric.length > 0 || selectedSizes.length > 0) && (
          <button
            onClick={clearAll}
            className="text-xs flex items-center gap-1"
            style={{ color: "var(--accent)", fontFamily: "'Inter', sans-serif" }}
          >
            <X size={11} /> Clear
          </button>
        )}
      </div>

      <div className="filter-section">
        <button type="button" className="filter-header" onClick={() => toggleSection("category")}>
          <span>CATEGORY</span>
          {openSections.includes("category") ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {openSections.includes("category") && (
          <div className="filter-content" onClick={(e) => e.stopPropagation()}>
            {categories.filter((c) => c !== "All").map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-chip-btn ${selectedCategories.includes(cat) ? "active" : ""}`}
                onClick={() => toggleFilter(setSelectedCategories, cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="filter-section">
        <button type="button" className="filter-header" onClick={() => toggleSection("price")}>
          <span>PRICE</span>
          {openSections.includes("price") ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {openSections.includes("price") && (
          <div className="filter-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between text-xs mb-2" style={{ color: "var(--text-muted)", fontFamily: "'Inter', sans-serif" }}>
              <span>₹0</span>
              <span>₹{maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={500}
              max={4000}
              step={100}
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value));
                setPage(1);
              }}
            />
          </div>
        )}
      </div>

      <div className="filter-section">
        <button type="button" className="filter-header" onClick={() => toggleSection("size")}>
          <span>SIZE</span>
          {openSections.includes("size") ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {openSections.includes("size") && (
          <div className="filter-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleFilter(setSelectedSizes, size)}
                  className={`size-btn ${selectedSizes.includes(size) ? "active" : ""}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="filter-section">
        <button type="button" className="filter-header" onClick={() => toggleSection("fabric")}>
          <span>FABRIC</span>
          {openSections.includes("fabric") ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {openSections.includes("fabric") && (
          <div className="filter-content" onClick={(e) => e.stopPropagation()}>
            {fabrics.filter((f) => f !== "All").map((fab) => (
              <button
                key={fab}
                type="button"
                className={`filter-chip-btn ${selectedFabric.includes(fab) ? "active" : ""}`}
                onClick={() => toggleFilter(setSelectedFabric, fab)}
              >
                {fab}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <main style={{ background: "var(--bg-primary)", color: "var(--text-primary)", minHeight: "100vh" }}>
      <Navbar />
      <WhatsAppFloat />

      <div style={{ paddingTop: "88px" }}>
        {/* ── Page Header ── */}
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
          {/* Breadcrumb */}
          <div className="breadcrumb flex items-center gap-2 mb-4">
            <a href="/" className="hover:text-accent transition-colors" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}>Home</a>
            <ChevronRight size={12} style={{ color: "var(--text-muted)" }} />
            <span style={{ color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}>Shop</span>
          </div>

          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h1 className="font-display font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.05, color: "var(--text-primary)" }}>
              {pageTitle}
            </h1>

            <div className="flex items-center gap-3">
              {/* Mobile filter toggle */}
              <button
                className="flex items-center gap-2 text-sm md:hidden"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--text-primary)" }}
                onClick={() => setMobileFilterOpen(true)}
              >
                <SlidersHorizontal size={15} />
                Filter
              </button>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-xs hidden sm:block" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
                  {filtered.length} items
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                  className="text-sm outline-none px-3 py-1.5 rounded"
                  style={{
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: "pointer",
                  }}
                >
                  <option value="default">Sort: Featured</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="name">Name: A–Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ borderTop: "1px solid var(--border)", margin: "0 24px" }} />

        {/* ── Main Layout ── */}
        <div className="max-w-7xl mx-auto px-6 py-8 flex gap-10">
          {/* Left Sidebar — Desktop */}
          <div className="hidden md:block sticky self-start" style={{ minWidth: "200px", top: "88px" }}>
            <FilterPanel />
          </div>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {paginated.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-display text-3xl mb-3" style={{ color: "var(--text-secondary)" }}>NO PRODUCTS FOUND</p>
                <button onClick={clearAll} className="btn-primary mt-4">Clear Filters</button>
              </div>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
                  {paginated.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-2 mt-12 justify-center">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className={`page-btn ${page === p ? "active" : ""}`}
                      >
                        {p}
                      </button>
                    ))}
                    {page < totalPages && (
                      <button
                        onClick={() => { setPage(page + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="page-btn"
                        style={{ width: "auto", padding: "0 12px" }}
                      >
                        <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile Filter Drawer ── */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[800]"
              style={{ background: "rgba(0,0,0,0.4)" }}
              onClick={() => setMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 z-[900] overflow-y-auto p-6"
              style={{ background: "white", width: "280px", maxWidth: "85vw" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg">FILTERS</h3>
                <button onClick={() => setMobileFilterOpen(false)} style={{ color: "var(--text-muted)" }}>
                  <X size={20} />
                </button>
              </div>
              <FilterPanel />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
