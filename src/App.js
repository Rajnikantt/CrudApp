import React, { useEffect, useState } from 'react'
import ProductForm from './components/ProductForm'
import ProductCard from './components/ProductCard'
import * as api from './api'


export default function App(){
  const [products, setProducts] = useState(null)
  const [editing, setEditing] = useState(null)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('newest')

  useEffect(()=>{ refresh() }, [])

  async function refresh(){
    const list = await api.listProducts()
    setProducts(list)
  }

  async function handleSave(payload){
    if (editing){
      await api.updateProduct(editing.id, payload)
      setEditing(null)
    } else {
      await api.createProduct(payload)
    }
    refresh()
  }

  async function handleDelete(id){
    await api.deleteProduct(id)
    refresh()
  }

  const filtered = (products || []).filter(p => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  }).slice()

  if (sort === 'price-asc') filtered.sort((a,b)=>a.price-b.price)
  else if (sort === 'price-desc') filtered.sort((a,b)=>b.price-a.price)
  else filtered.sort((a,b)=> (a.id < b.id ? 1 : -1)) // newest first because id uses timestamp

  return (
    <div className="app">
      <header>
        <h1>Fitness Products and Accessories </h1>
      </header>

      {/* Adeed productForm.js after this header and before this <div className = "panel"*/}

      <div className="panel">
        <div>
          <ProductForm onSave={handleSave} editing={editing} onCancel={()=>setEditing(null)} />
          <div className="card" style={{marginTop:16}}>
            <h3>Search & Sort</h3>

            <div className="search-row">
              <input placeholder="Search name or category..." value={query} onChange={e=>setQuery(e.target.value)}
              />

              <select value={sort} onChange={e=>setSort(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
            <div style={{fontSize:13, color:'#6b7280'}}>Showing {filtered.length} products</div>
          </div>
        </div>

        {/*------Added or edited Product section ----------------------------------------------------------------------- */}

        <div>
          <div className="card">
            <h3> Listed Products</h3>

            {products === null ? <div>Loading...</div> : null}
            {products && products.length === 0 ? <div className="no-products">No products yet.</div> : null}
            <div style={{marginTop:12}}>

              <div className="products-list">{filtered.map(p => (
                  <ProductCard key={p.id} product={p} onEdit={(prod)=>setEditing(prod)} onDelete={handleDelete} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
