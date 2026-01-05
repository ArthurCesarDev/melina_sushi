"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Divider,
  Stack,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import DeleteIcon from "@mui/icons-material/Delete"
import { CartItem } from "@/hooks/useCart"

type Props = {
  cart: CartItem[]
  total: number
  onRemove: (id: number) => void
  onFinish: (address: string, paymentMethod: string, obs: string) => void
  isOpen: boolean
  toggle: () => void
}

const payments = ["PIX", "Dinheiro", "Crédito", "Débito"]

export default function CartDrawer({
  cart,
  total,
  onRemove,
  onFinish,
  isOpen,
  toggle,
}: Props) {
  const [address, setAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [obs, setObs] = useState("")

  const handleFinish = () => {
    if (!address.trim()) {
      setError("🏠 Por favor, insira o endereço de entrega.")
      return
    }
    if (!paymentMethod) {
      setError("💳 Selecione a forma de pagamento.")
      return
    }

    onFinish(address, paymentMethod, obs)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: 360,
            height: "100vh",
            zIndex: 1300,
            background: "inherit",
          }}
        >
          <Box
            sx={{
              height: "100%",
              bgcolor: "background.paper",
              p: 3,
              display: "flex",
              flexDirection: "column",
              boxShadow: 24,
            }}
          >
            {/* Header */}
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6" fontWeight={800}>
                🛒 Seu Pedido
              </Typography>
              <IconButton onClick={toggle}>
                <CloseIcon />
              </IconButton>
            </Box>

            {cart.length === 0 ? (
              <Typography color="text.secondary">
                Carrinho vazio
              </Typography>
            ) : (
              <>
                {/* Lista */}
                <Box flex={1} overflow="auto">
                  {cart.map(item => (
                    <Box key={item.id} mb={2}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography fontWeight={600} color="primary">
                          {item.name}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => onRemove(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>

                      <Typography variant="body2" color="text.secondary">
                        {item.quantity}x R$ {item.price.toFixed(2)}
                      </Typography>

                      <Divider sx={{ mt: 1 }} />
                    </Box>
                  ))}
                </Box>

                {/* Endereço */}
                <TextField
                  label="Endereço de entrega"
                  fullWidth
                  margin="dense"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />

                {/* Obs */}
                <TextField
                  label="Observações"
                  fullWidth
                  margin="dense"
                  value={obs}
                  onChange={e => setObs(e.target.value)}
                />

                {/* Pagamento */}
                <Typography fontWeight={600} mt={2}>
                  Forma de pagamento
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                  {payments.map(p => (
                    <Button
                      key={p}
                      variant={paymentMethod === p ? "contained" : "outlined"}
                      onClick={() => setPaymentMethod(p)}
                    >
                      {p}
                    </Button>
                  ))}
                </Stack>

                {/* Total */}
                <Typography fontWeight={800} mt={3}>
                  Total: R$ {total.toFixed(2)}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleFinish}
                >
                  Confirmar Pedido
                </Button>
              </>
            )}

            {/* Modal de erro */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2000,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "background.paper",
                      p: 3,
                      borderRadius: 3,
                      textAlign: "center",
                      width: 280,
                    }}
                  >
                    <Typography color="error" fontWeight={700} mb={1}>
                      ⚠️ Atenção
                    </Typography>
                    <Typography variant="body2" mb={2}>
                      {error}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => setError(null)}
                    >
                      OK
                    </Button>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
