"use client"

/* eslint-disable */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Star, Truck, RefreshCcw, CheckCircle, ChevronLeft, Search, ShoppingBag } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import LoadingSpinner from '../components/Ui/LoadingSpinner'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import axios from 'axios'
import ProductCard from '../components/Ui/ProductCard'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState('')

  useEffect(() => {
    const getProducts = async () => {
        const {data} = await axios.get("/api/get-all-products")

        if (data) {
          setProducts(data)
        }
    }

    getProducts();

  }, [])
  

  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Piso Goma Estoperol 3 Mm",
      image: "https://www.cruzeirogomas.cl/wp-content/uploads/sites/2/2024/10/15279773_I271PIST12NE_4_Piso_de_goma_estoperol_negro_3mm_espesor_1_2_mt_ancho-1.webp",
      price: 92430,
      category: "Pisos Industriales",
    },
    {
      id: 2,
      name: "Piso de Goma Liso 5 Mm",
      image: "/placeholder.svg?text=Piso+Liso",
      price: 105000,
      category: "Pisos Industriales",
    },
    {
      id: 3,
      name: "Piso Antifatiga 10 Mm",
      image: "/placeholder.svg?text=Piso+Antifatiga",
      price: 150000,
      category: "Pisos Ergonómicos",
    },
    {
      id: 4,
      name: "Plancha de Caucho 2 Mm",
      image: "/placeholder.svg?text=Plancha+Caucho",
      price: 75000,
      category: "Planchas de Caucho",
    },
    {
      id: 5,
      name: "Botas de Seguridad",
      image: "/placeholder.svg?text=Botas+Seguridad",
      price: 89990,
      category: "Calzado Industrial",
    },
    {
      id: 6,
      name: "Kit de Sellos Hidráulicos",
      image: "/placeholder.svg?text=Kit+Sellos",
      price: 120000,
      category: "Sellos Industriales",
    },
  ];

  // Mock data for trusted companies
  const trustedCompanies = [
    { name: "Empresa 1", logo: "/chilemat.png" },
    { name: "Empresa 2", logo: "/cinepolis.png" },
    { name: "Empresa 3", logo: "/lider.png" },
    { name: "Empresa 4", logo: "/mct.png" },
    { name: "Empresa 5", logo: "/mtsferreteros.png" },
    { name: "Empresa 6", logo: "/nuevopudahuel.png" },
    { name: "Empresa 7", logo: "/redmovilidad.png" },
    { name: "Empresa 8", logo: "/sodimac.png" },
  ]

  const productCategories = [
    { 
      name: "SEGURIDAD VIAL", 
      image: "/placeholder.svg?text=Seguridad+Vial",
      description: "Productos de caucho para señalización y seguridad en carreteras" 
    },
    { 
      name: "CONTENEDORES", 
      image: "/placeholder.svg?text=Contenedores",
      description: "Soluciones en caucho para almacenamiento y transporte" 
    },
    { 
      name: "SOLUCIONES EN CAUCHO", 
      image: "/placeholder.svg?text=Soluciones+Caucho",
      description: "Productos especializados de caucho para diversos usos" 
    },
    { 
      name: "HOGAR", 
      image: "/placeholder.svg?text=Hogar",
      description: "Productos de caucho para uso doméstico" 
    }
  ];

  const marketplaces = [
    { name: "MercadoLibre", logo: "/mercadolibre.png" },
    { name: "Paris", logo: "/pariscencosud.png" },
    { name: "Falabella", logo: "/falabella.png" },
  ]

  if (!products) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#222222]">

      {/* Hero Section */}
      <section className="bg-[#f7f7f7]">
        <Swiper
       
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="h-[60vh] relative"
        >
          {[
            "/placeholder.svg?text=Product1",
            "/placeholder.svg?text=Product2",
            "/placeholder.svg?text=Product3",
          ].map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full bg-center bg-cover" style={{backgroundImage: `url(${image})`}}>
                <div className="container mx-auto px-4 h-full flex items-center">
                  {/* <h2 className="text-4xl md:text-5xl font-bold text-white shadow-text">
                    
                  </h2> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev !w-8 !h-8 !bg-[#397e4c]/80 !text-white hover:!bg-[#5da872] !rounded-full !shadow-md !transition-all !duration-300 !left-4 !after:!text-xs !after:!font-bold"></div>
          <div className="swiper-button-next !w-8 !h-8 !bg-[#397e4c]/80 !text-white hover:!bg-[#5da872] !rounded-full !shadow-md !transition-all !duration-300 !right-4 !after:!text-xs !after:!font-bold"></div>
        </Swiper>
      </section>

      {/* Search Bar & Product Carousel */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#397e4c]">Encuentra tu producto ideal</h2>
          <div className="max-w-3xl mx-auto relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-4 text-lg border-b-2 border-[#397e4c] focus:outline-none focus:border-[#5da872] transition-colors"
            />
            <button 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-[#397e4c] hover:text-[#5da872] transition-colors"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
          <div className="mt-12">
            <Swiper
           
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="product-carousel"
            >

              
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Trusted Companies Slider */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Empresas que confían en CruzeiroGomas</h2>
          <div className="relative overflow-hidden py-4">
            <div className="flex animate-scroll space-x-8">
              {[...trustedCompanies, ...trustedCompanies].map((company, index) => (
                <div key={index} className="flex-shrink-0">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={75}
                    height={75}
                    className="mx-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-8 text-center">Productos Destacados</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredProducts.slice(0, 4).map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 right-4 bg-[#397e4c] text-white px-3 py-1 rounded-full text-sm font-medium">
              40% DCTO
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center mb-2">
              <Image
                src="/placeholder.svg?text=CG"
                alt="CruzeiroGomas Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-2 text-sm font-semibold text-gray-600">CRUZEIROGOMAS</span>
            </div>
            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
            <div className="flex items-baseline mb-2">
              <span className="text-2xl font-bold text-[#397e4c]">{product.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span>
              <span className="ml-2 text-lg text-gray-500 line-through">{(product.price * 1.4).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-gray-100 px-3 py-1 rounded-full inline-block text-sm text-gray-600">
                6 cuotas sin interés
              </div>
              <button className="w-full bg-[#397e4c] hover:bg-[#5da872] text-white">
                Ver más
              </button>
            </div> 
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Product Categories Carousel */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#397e4c]">
            Soluciones para diferentes industrias
          </h2>
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination',
              }}
              autoplay={{ delay: 5000 }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="mySwiper relative px-4"
            >
              {productCategories.map((category, index) => (
                <SwiperSlide key={index} className="h-full">
                  <div className="relative aspect-square overflow-hidden rounded-lg group h-full">
                    <Image
                      src={category.image}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-t from-black/70 to-transparent">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wider drop-shadow-lg">{category.name}</h3>
                      <div className="flex flex-col gap-2">
                        <p className="text-sm text-white drop-shadow">{category.description}</p>
                        <button className="w-full bg-[#397e4c] hover:bg-[#5da872] text-white mt-2">
                          Ver más
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-button-prev !w-10 !h-10 !bg-white !text-[#397e4c] hover:!bg-[#397e4c] hover:!text-white !rounded-full !shadow-lg !transition-all !duration-300 !left-0 !after:text-sm"></div>
            <div className="swiper-button-next !w-10 !h-10 !bg-white !text-[#397e4c] hover:!bg-[#397e4c] hover:!text-white !rounded-full !shadow-lg !transition-all !duration-300 !right-0 !after:text-sm"></div>
            <div className="swiper-pagination !bottom-0 !pb-4"></div>
          </div>
        </div>
      </section>

      {/* Marketplaces Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Nos puedes encontrar en</h2>
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={2}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 3 },
              }}
              className="marketplace-carousel"
            >
              {marketplaces.map((marketplace, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-100 rounded-full p-4 mb-2">
                      <Image
                        src={marketplace.logo}
                        alt={marketplace.name}
                        width={75}
                        height={75}
                        className="rounded-full"
                      />
                    </div>
                    <span className="text-sm font-medium">{marketplace.name}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Mundo Cruzeiro Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#397e4c] mb-2">Mundo Cruzeiro</h2>
            <p className="text-xl text-gray-600">Todas las soluciones en caucho que necesitas para tus proyectos</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <Image
                  src="/placeholder.svg?text=Piso+Industrial"
                  alt="Piso de Goma Industrial"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#397e4c] text-white px-3 py-1 rounded-full text-sm font-medium">
                  40% DCTO
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <Image
                    src="/placeholder.svg?text=CG"
                    alt="CruzeiroGomas Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="ml-2 text-sm font-semibold text-gray-600">CRUZEIROGOMAS</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Piso de Goma Industrial Antideslizante</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-2xl font-bold text-[#397e4c]">$89.990</span>
                  <span className="ml-2 text-lg text-gray-500 line-through">$149.990</span>
                </div>
                <div className="bg-gray-100 px-3 py-1 rounded-full inline-block text-sm text-gray-600">
                  6 cuotas sin interés
                </div>
                <button className="w-full mt-2 bg-[#397e4c] hover:bg-[#5da872] text-white">
                  Ver más
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <Image
                  src="/placeholder.svg?text=Caucho+Antifatiga"
                  alt="Plancha de Caucho Antifatiga"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#397e4c] text-white px-3 py-1 rounded-full text-sm font-medium">
                  30% DCTO
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <Image
                    src="/placeholder.svg?text=CG"
                    alt="CruzeiroGomas Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="ml-2 text-sm font-semibold text-gray-600">CRUZEIROGOMAS</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Plancha de Caucho Antifatiga Premium</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-2xl font-bold text-[#397e4c]">$45.990</span>
                  <span className="ml-2 text-lg text-gray-500 line-through">$65.990</span>
                </div>
                <div className="bg-gray-100 px-3 py-1 rounded-full inline-block text-sm text-gray-600">
                  Envío gratis
                </div>
                <button className="w-full mt-2 bg-[#397e4c] hover:bg-[#5da872] text-white">
                  Ver más
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <Image
                  src="/placeholder.svg?text=Caucho+Nitrilo"
                  alt="Plancha de Caucho Nitrilo"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#397e4c] text-white px-3 py-1 rounded-full text-sm font-medium">
                  25% DCTO
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <Image
                    src="/placeholder.svg?text=CG"
                    alt="CruzeiroGomas Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="ml-2 text-sm font-semibold text-gray-600">CRUZEIROGOMAS</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Plancha de Caucho Nitrilo Industrial</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-2xl font-bold text-[#397e4c]">$79.990</span>
                  <span className="ml-2 text-lg text-gray-500 line-through">$105.990</span>
                </div>
                <div className="bg-gray-100 px-3 py-1 rounded-full inline-block text-sm text-gray-600">
                  Stock limitado
                </div>
                <button className="w-full mt-2 bg-[#397e4c] hover:bg-[#5da872] text-white">
                  Ver más
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <Image
                  src="/placeholder.svg?text=Kit+Sellos"
                  alt="Kit de Sellos Industriales"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#397e4c] text-white px-3 py-1 rounded-full text-sm font-medium">
                  35% DCTO
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <Image
                    src="/placeholder.svg?text=CG"
                    alt="CruzeiroGomas Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="ml-2 text-sm font-semibold text-gray-600">CRUZEIROGOMAS</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Kit de Sellos Industriales de Caucho</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-2xl font-bold text-[#397e4c]">$129.990</span>
                  <span className="ml-2 text-lg text-gray-500 line-through">$199.990</span>
                </div>
                <div className="bg-gray-100 px-3 py-1 rounded-full inline-block text-sm text-gray-600">
                  Último disponible
                </div>
                <button className="w-full mt-2 bg-[#397e4c] hover:bg-[#5da872] text-white">
                  Ver más
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="bg-[#397e4c] rounded-lg p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold mb-2">¿Eres especialista?</h3>
                  <p className="text-lg opacity-90">Descubre beneficios exclusivos en nuestro programa para profesionales</p>
                </div>
                <button className="bg-white text-[#397e4c] hover:bg-gray-100">
                  Conoce más
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Showcase Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">¿Por qué elegir CruzeiroGomas?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#5da872] rounded-full p-4 inline-block mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Calidad Superior</h3>
              <p className="text-gray-600">Nuestros productos de gomas son certificados y fabricados con los mejores materiales para garantizar durabilidad y rendimiento superior.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#5da872] rounded-full p-4 inline-block mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Envío Rápido</h3>
              <p className="text-gray-600">Entregamos en todo Chile con rapidez y eficiencia para que recibas tu pedido lo antes posible.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#5da872] rounded-full p-4 inline-block mb-4">
                <RefreshCcw className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Asesoría Experta</h3>
              <p className="text-gray-600">Nuestro equipo de expertos está disponible para ayudarte a elegir el mejor producto para tus necesidades.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[#eeeeee]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Lo que dicen nuestros clientes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                </div>
                <span className="ml-2 text-gray-600">5.0</span>
              </div>
              <p className="text-gray-600 mb-4">"Excelente calidad de los pisos de goma. Han mejorado significativamente la seguridad en nuestra fábrica."</p>
              <p className="font-semibold">Juan Pérez - Gerente de Producción</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                  <Star className="fill-current" /><Star className="fill-current" />
                </div>
                <span className="ml-2 text-gray-600">5.0</span>
              </div>
              <p className="text-gray-600 mb-4">"El servicio al cliente de CruzeiroGomas es excepcional. Nos ayudaron a elegir el piso perfecto para nuestro gimnasio."</p>
              <p className="font-semibold">María González - Propietaria de Gimnasio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Footer Information Cards */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#397e4c] text-white rounded-lg p6 flex items-center gap-4 transition-transform hover:scale-105 hover:bg-[#5da872]">
              <div className="bg-white p-3 rounded-full">
                <Image
                  src="/placeholder.svg?text=👷"
                  alt="Constructor Icon"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">Mundo Cruzeiro</h3>
                <p className="text-sm">Todo para el especialista</p>
              </div>
            </div>
            <div className="bg-[#397e4c] text-white rounded-lg p-6 flex items-center gap-4 transition-transform hover:scale-105 hover:bg-[#5da872]">
              <div className="bg-white p-3 rounded-full">
                <Image
                  src="/placeholder.svg?text=📞"
                  alt="Phone Icon"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">Venta Telefónica</h3>
                <p className="text-sm">Llámanos al 600 390 6500</p>
              </div>
            </div>

            <div className="bg-[#397e4c] text-white rounded-lg p-6 flex items-center gap-4 transition-transform hover:scale-105 hover:bg-[#5da872]">
              <div className="bg-white p-3 rounded-full">
                <Image
                  src="/placeholder.svg?text=📄"
                  alt="Documents Icon"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">Documentos Legales</h3>
                <p className="text-sm">Acuerdo PVC Sernac y otros</p>
              </div>
            </div>

            <div className="bg-[#397e4c] text-white rounded-lg p-6 flex items-center gap-4 transition-transform hover:scale-105 hover:bg-[#5da872]">
              <div className="bg-white p-3 rounded-full">
                <Image
                  src="/placeholder.svg?text=🕒"
                  alt="Clock Icon"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">Horarios de Tienda</h3>
                <p className="text-sm">Revisa nuestras tiendas aquí</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

    </div>
  )
}
