import React, { useState, useEffect, useRef } from 'react';
import './ProductList.scss';

const fallbackData = {
    data: {
        products: {
            items: [
                {
                    id: 103,
                    name: "Hand Packed Ice Cream",
                    description: {
                        html: ""
                    },
                    price_range: {
                        minimum_price: {
                            regular_price: {
                                value: 5.99,
                                currency: "USD"
                            }
                        }
                    },
                    image: {
                        url: "https://fresh-com526.adobedemo.com/media/catalog/product/cache/ba935c1edb02cfc2428c438bbd539884/a/d/adobestock_40117273.jpeg"
                    }
                },
                {
                    "id": 96,
                    "name": "Farm House Pizza",
                    "description": {
                        "html": ""
                    },
                    "price_range": {
                        "minimum_price": {
                            "regular_price": {
                                "value": 12.99,
                                "currency": "USD"
                            }
                        }
                    },
                    "image": {
                        "url": "https://fresh-com526.adobedemo.com/media/catalog/product/cache/ba935c1edb02cfc2428c438bbd539884/f/a/farm-house-pizza.jpeg"
                    }
                },
                {
                    "id": 20,
                    "name": "Potato Russet Large",
                    "description": {
                        "html": "Potato Russet Large USA"
                    },
                    "price_range": {
                        "minimum_price": {
                            "regular_price": {
                                "value": 0.95,
                                "currency": "USD"
                            }
                        }
                    },
                    "image": {
                        "url": "https://fresh-com526.adobedemo.com/media/catalog/product/cache/ba935c1edb02cfc2428c438bbd539884/a/d/adobestock_189257180.jpeg"
                    }
                },
                {
                    "id": 10,
                    "name": "Watermelon Red Whole ",
                    "description": {
                        "html": "Watermelon Red Whole "
                    },
                    "price_range": {
                        "minimum_price": {
                            "regular_price": {
                                "value": 7.3,
                                "currency": "USD"
                            }
                        }
                    },
                    "image": {
                        "url": "https://fresh-com526.adobedemo.com/media/catalog/product/cache/ba935c1edb02cfc2428c438bbd539884/a/d/adobestock_227041521.jpeg"
                    }
                },
                {
                    "id": 95,
                    "name": "Hot Ham Pizza",
                    "description": {
                        "html": ""
                    },
                    "price_range": {
                        "minimum_price": {
                            "regular_price": {
                                "value": 14.99,
                                "currency": "USD"
                            }
                        }
                    },
                    "image": {
                        "url": "https://fresh-com526.adobedemo.com/media/catalog/product/cache/ba935c1edb02cfc2428c438bbd539884/h/o/hot-ham-pizza.jpeg"
                    }
                },
                {
                    "id": 19,
                    "name": "Mushroom White Button ",
                    "description": {
                        "html": "<div data-content-type=\"row\" data-appearance=\"contained\" data-element=\"main\"><div data-enable-parallax=\"0\" data-parallax-speed=\"0.5\" data-background-images=\"{}\" data-background-type=\"image\" data-video-loop=\"true\" data-video-play-only-visible=\"true\" data-video-lazy-load=\"true\" data-video-fallback-src=\"\" data-element=\"inner\" style=\"justify-content: flex-start; display: flex; flex-direction: column; background-position: left top; background-size: cover; background-repeat: no-repeat; background-attachment: scroll; border-style: none; border-width: 1px; border-radius: 0px; margin: 0px 0px 10px; padding: 10px;\"><div data-content-type=\"html\" data-appearance=\"default\" data-element=\"main\" style=\"border-style: none; border-width: 1px; border-radius: 0px; margin: 0px; padding: 0px;\">Mushroom White Button </div></div></div>"
                    },
                    "price_range": {
                        "minimum_price": {
                            "regular_price": {
                                "value": 3.9,
                                "currency": "USD"
                            }
                        }
                    },
                    "image": {
                        "url": "https://fresh-com526.adobedemo.com/media/catalog/product/cache/ba935c1edb02cfc2428c438bbd539884/a/d/adobestock_259214636.jpeg"
                    }
                },
                {
                    "id": 9,
                    "name": "Coconut Thailand",
                    "description": {
                        "html": "Coconut Top-Off Thailand"
                    },
                    "price_range": {
                        "minimum_price": {
                            "regular_price": {
                                "value": 4.5,
                                "currency": "USD"
                            }
                        }
                    },
                    "image": {
                        "url": "https://fresh-com526.adobedemo.com/media/catalog/product/cache/ba935c1edb02cfc2428c438bbd539884/a/d/adobestock_107409989.jpeg"
                    }
                },
                {
                    "id": 94,
                    "name": "Spicy Sausage Pizza",
                    "description": {
                        "html": ""
                    },
                    "price_range": {
                        "minimum_price": {
                            "regular_price": {
                                "value": 14.99,
                                "currency": "USD"
                            }
                        }
                    },
                    "image": {
                        "url": "https://fresh-com526.adobedemo.com/media/catalog/product/cache/ba935c1edb02cfc2428c438bbd539884/s/p/spicy-sausage-pizza.jpeg"
                    }
                },
                {
                    "id": 85,
                    "name": "Chicken Breast",
                    "description": {
                        "html": ""
                    },
                    "price_range": {
                        "minimum_price": {
                            "regular_price": {
                                "value": 2.99,
                                "currency": "USD"
                            }
                        }
                    },
                    "image": {
                        "url": "https://fresh-com526.adobedemo.com/media/catalog/product/cache/ba935c1edb02cfc2428c438bbd539884/a/d/adobestock_80961816.jpeg"
                    }
                },
                {
                    "id": 73,
                    "name": "Pizza Sauce",
                    "description": {
                        "html": ""
                    },
                    "price_range": {
                        "minimum_price": {
                            "regular_price": {
                                "value": 1.49,
                                "currency": "USD"
                            }
                        }
                    },
                    "image": {
                        "url": "https://fresh-com526.adobedemo.com/media/catalog/product/cache/ba935c1edb02cfc2428c438bbd539884/a/d/adobestock_234196947.jpeg"
                    }
                }
            ]
        }
    }
};

const ProductList = ({ categoryUid }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const carouselRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (categoryUid === "Mw==") {
                    categoryUid = "10001,10002,10003";
                }
                const skus = categoryUid.split(',').map(sku => sku.trim());
                const response = await fetch('https://com526.adobedemo.com/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Store': 'fresh_store'
                    },
                    body: JSON.stringify({
                        query: `
              query GetProducts($skus: [String!]) {
                products(filter: { sku: { in: $skus } }) {
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
                        variables: { skus }
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setProducts(result.data.products.items);
            } catch (err) {
                if (err.message === 'Failed to fetch') {
                    setProducts(fallbackData.data.products.items);
                } else {
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryUid]);

    if (loading) return <div className="spinner">Loading...</div>;
    if (error) return <p>Error: {error.message}</p>;
    if (products.length === 0) return <p>No products found.</p>;

    return (
        <div className="product-list-container">
            <h2>Shop the Ingredients</h2>
            <div className="product-list" ref={carouselRef}>
                {products.map(product => (
                    <div key={product.id} className="product-item">
                        <h2>{product.name}</h2>
                        <img src={product.image.url} alt={product.name}/>
                        {/*<div className="description" dangerouslySetInnerHTML={{__html: product.description.html}}/>*/}
                        <p className="price">
                            Price: {product.price_range.minimum_price.regular_price.value} {product.price_range.minimum_price.regular_price.currency}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
