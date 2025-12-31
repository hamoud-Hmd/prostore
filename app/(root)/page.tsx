import { getLatestProduct } from "@/lib/actions/product.actions";
import ProductList from "@/components/product/product-list";
const Homepage = async () => {
  const latestProducts = await getLatestProduct()
  return (<ProductList data={latestProducts} title="Featured Products" />);
}

export default Homepage;