import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS=[
  {
    id:"p1", title:"Test1" , price:10 , description: 'This is a first product - amazing!'
  },
  {
    id:"p2", title:"Test2" , price:6 , description: 'This is the second product - awesome!'
  },
  {
    id:"p3", title:"Test3" , price:20 , description: 'This is a third product - latest one!'
  },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((item)=>{
          return <ProductItem key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
        />
        })}
      </ul>
    </section>
  );
};

export default Products;
