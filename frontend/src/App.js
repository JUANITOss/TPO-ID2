import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import UserActivity from './components/UserActivity';
import Cart from './components/Cart';
import OrderList from './components/OrderList';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><a href="/">Usuarios</a></li>
            <li><a href="/agregar-usuario">Agregar Usuario</a></li>
            <li><a href="/actividad-usuario">Registrar Actividad</a></li>
            <li><a href="/carrito">Carrito</a></li>
            <li><a href="/pedidos">Pedidos</a></li>
            <li><a href="/productos">Catálogo de Productos</a></li>
            <li><a href="/agregar-producto">Agregar Producto</a></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" exact component={UserList} />
          <Route path="/agregar-usuario" component={AddUser} />
          <Route path="/actividad-usuario" component={UserActivity} />
          <Route path="/carrito" component={() => <Cart userId="user-12345" />} />
          <Route path="/pedidos" component={() => <OrderList userId="user-12345" />} />
          <Route path="/productos" component={ProductList} />
          <Route path="/agregar-producto" component={AddProduct} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
