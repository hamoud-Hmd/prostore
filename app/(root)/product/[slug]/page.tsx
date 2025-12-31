import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getProductBySlug } from "@/lib/actions/product.actions";
import ProductPrice from '@/components/product/product-price'
import { notFound } from 'next/navigation'
import ProductImages from '@/components/product/product-images';

const ProductDetailsPage = async (props: { params: Promise<{ slug: string }> }) => {
    // const [liked, setLiked] = useState<boolean>(false)
    const { slug } = await props.params;
    const product = await getProductBySlug(slug);
    if (!product) notFound();

    return (<>
        <section>
            <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Product Images */}
                <div className="col-span-2">
                     <ProductImages images={product.images} />
                </div>
                {/* Product Details */}
                <div className="col-span-2 p-5">
                    <div className="flex flex-col gap-6">
                        <p><span className='text-primary'>{product.brand}</span> {product.category}</p>
                        <h1 className="h3-bold">{product.name}</h1>
                        <p>{product.rating} of {product.numReviews} Reviews</p>
                        <div className="flex flex-col sm:flex-row sm:items-center">
                            <ProductPrice value={Number(product.price)}
                                className="w-24 rounded-full bg-green-100 text-green-700 px-5 py-2" />
                        </div>
                        <div className="mt-10">
                            <p className="font-semibold">Description</p>
                            <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
                        </div>
                    </div>
                </div>
                {/* Action Buttons */}
                <div>
                    <Card>
                        <CardContent className='p-4'>
                            <div className="mb-2 flex justify-between">
                                <div>Price</div>
                                <div>
                                    <ProductPrice value={Number(product.price)} />
                                </div>
                            </div>
                            <div className="mb-2 flex justify-between">
                                <div>Status</div>
                                {product.stock > 0 ? (
                                    <Badge variant="default">In Stock</Badge>
                                ) : (
                                    <Badge variant="destructive">Out Of Stock</Badge>
                                )}
                            </div>
                            {(product.stock > 0 && (
                                <Button className="w-full mt-4">Add to Cart</Button>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    </>);
}

export default ProductDetailsPage;