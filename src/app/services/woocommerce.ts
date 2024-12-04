import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const wooCommerceClient = new WooCommerceRestApi({
  url: "https://www.cruzeirogomas.cl",
  consumerKey: "ck_ce0951a0005444315bfd95be50c8df3b3daa4f6",
  consumerSecret: "cs_4668827b7c781346252ec2b50a59cce1e6e60182",
  version: "wc/v3"
});

export interface WooProduct {
  id: number;
  name: string;
  price: string;
  regular_price: string;
  sale_price: string;
  images: Array<{
    src: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
  }>;
}

export interface WooOrder {
  id: number;
  status: string;
  total: string;
  line_items: Array<{
    product_id: number;
    quantity: number;
    total: string;
  }>;
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    postcode: string;
  };
}

export async function getProducts(category?: number, page: number = 1): Promise<WooProduct[]> {
  try {
    const params: any = {
      page,
      per_page: 12,
      status: 'publish'
    };
    
    if (category) {
      params.category = category;
    }

    const response = await wooCommerceClient.get('products', params);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function createOrder(orderData: any): Promise<WooOrder | null> {
  try {
    const consumerKey = 'ck_ce0951a0005444315bfd95be50c8df3b3daa4f6';
    const consumerSecret = 'cs_4668827b7c781346252ec2b50a59cce1e6e60182';
    const credentials = btoa(`${consumerKey}:${consumerSecret}`);

    const response = await fetch('https://www.cruzeirogomas.cl/wp-json/wc/v3/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || `Error creating order: ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function getCategories(): Promise<any[]> {
  try {
    const response = await wooCommerceClient.get('products/categories', {
      per_page: 100,
      hide_empty: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getShippingZones(): Promise<any[]> {
  try {
    const response = await wooCommerceClient.get('shipping/zones');
    return response.data;
  } catch (error) {
    console.error('Error fetching shipping zones:', error);
    return [];
  }
}

