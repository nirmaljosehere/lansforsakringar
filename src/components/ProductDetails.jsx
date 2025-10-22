import React, { useState, useEffect } from 'react';
import './ProductDetails.scss';

const fallbackData = {
    data: {
        products: {
            items: [
                {
                    id: 1,
                    name: "Banana Cavendish Aloha",
                    description: {
                        html: "Banana Cavendish Aloha"
                    },
                    price_range: {
                        minimum_price: {
                            regular_price: {
                                value: 3,
                                currency: "USD"
                            }
                        }
                    },
                    image: {
                        url: "https://fresh-com526.adobedemo.com/media/catalog/product/cache/ba935c1edb02cfc2428c438bbd539884/a/d/adobestock_206124360.jpeg"
                    }
                }
            ]
        }
    }
};

const ProductDetails = ({ sku }) => {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch('https://com526.adobedemo.com/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Store': 'fresh_store'
                    },
                    body: JSON.stringify({
                        query: `
              query GetProductDetails($sku: String!) {
                products(filter: { sku: { eq: $sku } }) {
                  items {
                    id
                    name
                    description {
                      html
                    }
                    price_range {
                      minimum_price {
                        regular_price {
                          value
                          currency
                        }
                      }
                    }
                    image {
                      url
                    }
                  }
                }
              }
            `,
                        variables: { sku }
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setProduct(result.data.products.items[0]);
            } catch (err) {
                if (err.message === 'Failed to fetch') {
                    setProduct(fallbackData.data.products.items[0]);
                } else {
                    setError(err);
                }
            }
        };

        fetchProductDetails();
    }, [sku]);

    if (error) return <p>Error: {error.message}</p>;
    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-details">
            <h1>{product.name}</h1>
            <img src={product.image.url} alt={product.name} />
            <div className="description" dangerouslySetInnerHTML={{ __html: product.description.html }} />
            <p className="price">
                Price: {product.price_range.minimum_price.regular_price.value} {product.price_range.minimum_price.regular_price.currency}
            </p>
        </div>
    );
};

export default ProductDetails;
