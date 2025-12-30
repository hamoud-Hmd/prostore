import { cn } from "@/lib/utils";

const ProductPrice = ({ value, className }: { value: number, className?: string }) => {
    // Ensure two decimal places
    const formattedPrice = value.toFixed(2);
    // Split into whole and decimal parts
    const [whole, decimal] = formattedPrice.split(".");

    return (
        <span className={cn('text-2xl', className)}>
            <span className="text-xs align-super">$</span>
            {whole}
            <span className="text-xs align-super">.{decimal}</span>
        </span>
    );
}

export default ProductPrice;