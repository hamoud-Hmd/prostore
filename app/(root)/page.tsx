import sampleData from "@/db/sample-data";
import ProductList from "@/components/product/product-list";
const Homepage = () => {
  return (<ProductList data={sampleData.products} title="Featured Products" limit={4} />);
}

export default Homepage;