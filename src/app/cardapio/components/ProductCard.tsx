"use client"

import Image from "next/image"
import { Product } from "@/types/Product"
import { motion } from "framer-motion"
import { useCart } from "@/context/CartContext"
import { useFlyToCart } from "@/hooks/useFlyToCart"
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { cart, addToCart, decreaseFromCart } = useCart()
  const { fly } = useFlyToCart()

  const item = cart.find(p => p.id === product.id)
  const quantity = item?.quantity ?? 0

  const handleAdd = (e: React.MouseEvent) => {
    const card = (e.currentTarget as HTMLElement).closest(".product-card")
    const img = card?.querySelector("img") as HTMLImageElement | null
    const cartBtn = document.getElementById("cart-button")
    if (img && cartBtn) fly(img, cartBtn)
    addToCart(product)
  }

  return (
    <motion.div whileHover={{ y: -4 }}>
      <Card className="product-card" sx={{ borderRadius: 4 }}>
        <Box sx={{ position: "relative", height: 180 }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>

        <CardContent sx={{ textAlign: "center" }}>
          <Typography fontWeight={700}>{product.name}</Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            {product.description}
          </Typography>

          <Typography
            variant="h6"
            fontWeight={800}
            color="primary"
            mb={1}
          >
            R$ {product.price.toFixed(2)}
          </Typography>

          {quantity === 0 ? (
            <Button
              fullWidth
              variant="contained"
              onClick={handleAdd}
            >
              Adicionar
            </Button>
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
              <IconButton
                color="primary"
                onClick={() => decreaseFromCart(product.id)}
              >
                <RemoveIcon />
              </IconButton>

              <Typography fontWeight={700}>{quantity}</Typography>

              <IconButton color="primary" onClick={handleAdd}>
                <AddIcon />
              </IconButton>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
