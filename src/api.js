// localStorage-backed "API" for fitness products
const STORAGE_KEY = 'fitness_products'

const items = [
  { 
    id: 'p1',
   name: 'Adjustable Dumbbell',
   category: 'Strength',
   price: 1999,
   stock: 12,
   description: 'Space-saving adjustable dumbbell set.'
  },


  { 
    id: 'p2', 
    name: 'Yoga Mat Pro', 
    category: 'Yoga', 
    price: 799, 
    stock: 34, 
    description: 'High grip yoga mat, 6mm thick.' 
  },

  {
     id: 'p3', 
    name: 'Resistance Band Set', 
    category: 'Accessories', 
    price: 299, 
    stock: 50, 
    description: 'Set of 5 resistance bands, various strengths.' 

  }
]


function readAll(){
  const dataItems = localStorage.getItem(STORAGE_KEY)
  if (!dataItems){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    return items.slice()
  }
  try {
    return JSON.parse(dataItems)
  } catch(e){
    console.error('parse error', e)
    return []
  }
}

function writeAll(list){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export async function listProducts(){ return Promise.resolve(readAll()) }

export async function createProduct({ name, category, price, stock, description }){
  const list = readAll()
  const id = 'p' + Date.now().toString()
  const product = { id, name, category, price: Number(price), stock: Number(stock), description }
  list.unshift(product)
  writeAll(list)
  return Promise.resolve(product)
}

export async function updateProduct(id, payload){
  const list = readAll()
  const idx = list.findIndex(p=>p.id===id)
  if (idx === -1) throw new Error('Not found')
  list[idx] = { ...list[idx], ...payload, price: Number(payload.price), stock: Number(payload.stock) }
  writeAll(list)
  return Promise.resolve(list[idx])
}

export async function deleteProduct(id){
  const list = readAll().filter(p=>p.id!==id)
  writeAll(list)
  return Promise.resolve(true)
}

export async function getProduct(id){
  const list = readAll()
  return Promise.resolve(list.find(p=>p.id===id))
}
