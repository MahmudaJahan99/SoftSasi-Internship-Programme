import styles from './Card.module.css'
import sample from '../../assets/images/pexels-addy-bronzzz-264850064-14108017.jpg'
import { useState } from 'react';
import { toast } from 'react-toastify';

const Card = () => {
    const unitPrice = 450;
    const totalStock = 8;

    const [quantity, setQuantity] = useState(0)
    const [wishlist, setWishlist] = useState(false)

    // Calculate Values
    const remainingStock = totalStock - quantity;
    const totalPrice = quantity * unitPrice;

    // Increase Quantity
    const handleIncrease = () => {
        if (quantity < totalStock) {
            setQuantity(quantity + 1);
        }
    };

    // Decrease Quantity
    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    // Wishlist Toggle
    const handleWishlist = () => {
        setWishlist(!wishlist);
    };

    // Add To Cart Popup
    const handleCart = () => {
        toast.success('Added Successfully ✓', {
            style: {
                background: 'linear-gradient(135deg, #ff4da6, #ff85c1)',
                color: 'white',
                icon: false,
            },
        });
    };


    return (
        <div className={styles.card}>
            <div className={styles.productImageContainer}>
                <img
                    className={styles.productImage}
                    src={sample}
                    alt="product"
                />
            </div>

            <h1 className={styles.title}>Celeste Blush Embellished Gown</h1>

            <p className={styles.description}>
                Dreamy blush-nude tone with shimmering hand-embellished detailing, a
                structured square neckline, and flowing cape sleeves.
            </p>

            <div className={styles.stockAndPrice}>
                <div className={styles.price}>$<span>450</span></div>
                <div className={styles.stock}>Stock: 8 Left</div>
            </div>

            <div className={styles.quantityContainer}>
                <div>
                    <span>Quantity</span>
                    <span className={styles.quantity}>
                        {quantity}
                    </span>
                </div>

                <div className={styles.qtyBtnContainer}>
                    <button
                        className={styles.qtyBtn}
                        onClick={handleDecrease}
                        disabled={quantity <= 0}
                    >
                        −
                    </button>
                    <button
                        className={styles.qtyBtn}
                        onClick={handleIncrease}
                        disabled={remainingStock === 0}
                    >
                        +
                    </button>
                </div>
            </div>

            <div className={styles.ctaBtnContainer}>
                <button
                    className={styles.ctaBtn}
                    onClick={handleCart}
                    disabled={quantity === 0}
                >
                    Add To Cart
                </button>
                <button
                    className={styles.ctaBtn}
                    onClick={handleWishlist}
                >
                    {wishlist
                        ? "❤️ Wishlisted"
                        : "♡ Wishlist"}
                </button>
            </div>

            {/* Out Of Stock */}
            <div className={styles.outOfStock}>
                {remainingStock === 0 && "Out Of Stock"}
            </div>

            {/* Total */}
            <div className={styles.total}>
                Total: $
                <span>{totalPrice}</span>
            </div>
        </div>
    );
};

export default Card;