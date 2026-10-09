if( ! process.argv[2] || ! process.argv[3]){
    console.log('Formato npm start <method> <endpoint> [argumentos]')
}else{

    const args = process.argv.slice(2)

    const method = args[0].toUpperCase()

    let endpoint = args[1]
    let id = null

    if (endpoint && endpoint.includes('/')) {
        const partes = endpoint.split('/')
        endpoint = partes[0]
        id = partes[1]
    }

    const title = args[2] ? args[2] : null

    const price = args[3] ? args[3] : null

    const category = args[4] ? args[4] : null

    switch(method){

        // solicita todos o un producto
        case "GET":
            if(endpoint == 'products'){
                const products = await getProducts(id)
                console.log(products)
            }else{
                console.log('Comando incorrecto')
            }
            break
        
            // guarda un producto
        case "POST":
            if(endpoint == 'products' && title && price && category){
                const product = await postProduct(title, price, category)
                console.log('producto creado: ', product.id)
            }else{
                console.log('comando incorrecto')
            }
            break
        
            // elimina un producto
        case "DELETE":
            if(endpoint == 'products'){
                const product = await deleteProduct(id)
                console.log('producto borrado: ', product.id)
            }else{
                console.log('Comando incorrecto')
            }
            break
    }
}

async function getProducts(product = null){
    if(product){
        try{
            const response = await fetch(`https://fakestoreapi.com/products/${product}`)
            const data = await response.json()
            return data
        }
        catch(error){
            console.log(error)
        }
    }else{
        try{
            const response = await fetch(`https://fakestoreapi.com/products/`)
            const data = await response.json()
            return data
        }
        catch(error){
            console.log(error)
        }
    }
}

async function postProduct(title=null, price=null, category=null){
    
    const product = {
        title: title,
        price: price, 
        category: category
    }
    try{
        const url = `https://fakestoreapi.com/products`
        console.log(url)
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        }) 
        if(response.ok){
            const data = await response.json()
            return data
        }
    }catch{
        console.log(error)
    }
}

async function deleteProduct(product){
    try{
        const response = await fetch(`https://fakestoreapi.com/products/${product}`, {
            method:'DELETE',
            body: JSON.stringify(product)
        })
        if(response.ok){
            const data = await response.json()
            return data
        }
    }catch(error){
        console.log(error)
    }
}