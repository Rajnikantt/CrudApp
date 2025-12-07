
export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="product">
      <div className="title">{product.name}
      </div>
      <div className="meta">
        <span className="tag">{product.category}
        </span>
        <span className="price">₹{product.price.toLocaleString()}
        </span>
      </div>

      <div style={{minHeight:48}}>
        {product.description}
        </div>
        
      <div className="footer">
        <div className="meta">Stock: {product.stock}
        </div>

        <div className="actions">
          <button className="btn secondary" onClick={()=>onEdit(product)}>
            Edit
            </button>

          <button className="btn" style={{background:'#ef4444', color:'#fff'}}
           onClick={()=> { 
            if(window.confirm('Delete product?')) onDelete(product.id)
            }}>
            Delete
            </button>
        </div>
      </div>
    </div>
  )
}
