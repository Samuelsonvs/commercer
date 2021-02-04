import React, { useEffect } from 'react';
import Products from '../components/Products';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
// import { listProducts } from '../actions/productActions';
import { pList } from '../exreduce/productListSlice';

export default function HomeScreen() {

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.entities.productList);  // entities
  const { loading, error, list } = productList;  // product - list

  useEffect(() => {
    dispatch(pList());              // pList()   loadBugs()
  }, [dispatch])
    return (
      <div>
        {loading? (
          <LoadingBox></LoadingBox>
        ) :error ? (
        <MessageBox variant="danger">{error}</MessageBox>
        ) :  (      
        <div className="row center">
          {list.map((product) => (
              <Products key={product._id} product={product} />
            ))}
        </div>
        )}

      </div>
    );
}

