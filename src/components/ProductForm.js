import { useState, useEffect } from 'react'

export default function ProductForm({ onSave, editing, onCancel }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Strength')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [description, setDescription] = useState('')

  useEffect(()=>{
    if (editing) {
      setName(editing.name || '')
      setCategory(editing.category || 'Strength')
      setPrice(editing.price ?? '')
      setStock(editing.stock ?? '')
      setDescription(editing.description || '')
    } else {
      setName(''); setCategory('Strength'); setPrice(''); setStock(''); setDescription('')
    }
  }, [editing])


  function handleSubmit(e){
    e.preventDefault()
    if (!name.trim())
       return alert('Product name required')

    if (!price || isNaN(price))
       return alert('Valid price required')

    if (!stock || isNaN(stock)) 
      return alert('Valid stock required')

    onSave({ name: name.trim(), category, price: Number(price), stock: Number(stock), description: description.trim() 
    })
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>{editing ? 'Edit product' : 'Add product'}
      </h3>
      <div className="form-row">
        <label>Product name</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Whey Protein" />
      </div>

      {/* Product category--------------------------------------------------------------------------------------------------- */}
      
      <div className="form-row">
        <label>Category</label>
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          <option>Strength</option>
          <option>Cardio</option>
          <option>Yoga</option>
          <option>Accessories</option>
        </select>
      </div>

      {/* Price Amount */}
      <div className="form-row" style={{display:'flex', gap:8}}>
        <div style={{flex:1}}>
          <label>Price (₹)</label>
          <input value={price} onChange={e=>setPrice(e.target.value)} type="number" />
        </div>

      {/* stock Availability */}
        <div style={{width:120}}>
          <label>Stock</label>
          <input value={stock} onChange={e=>setStock(e.target.value)} type="number" />
        </div>
      </div>


      {/* Description box */}
      <div className="form-row">
        <label>Description</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={3} />
      </div>


      {/*Edit cancel button */}
       <div style={{display:'flex', gap:8, marginTop:8}}>
        <button className="btn" type="submit">{editing ? 'Save changes' : 'Create product'}</button>
        {editing ? <button type="button" className="btn secondary" onClick={onCancel}>Cancel</button> : null}
      </div>
    </form>
  )
}
