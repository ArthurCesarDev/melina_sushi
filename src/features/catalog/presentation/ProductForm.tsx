'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useToast } from '@/context/ToastContext';
import { createProduct, updateProduct } from '@/features/catalog/data/product-service';
import type { CatalogProduct } from '@/features/catalog/domain/catalog';
import { uploadImage } from '@/core/files/image-upload-service';
import { getErrorMessage } from '@/core/errors/get-error-message';

interface ProductFormProps {
  categoryId: string;
  onClose: () => void;
  onSuccess: () => void;
  product?: CatalogProduct | null;
}

export default function ProductForm({
  categoryId,
  onClose,
  onSuccess,
  product,
}: ProductFormProps) {
  const { showToast } = useToast();

  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price?.toString() || '');
  const [image, setImage] = useState<File | null>(null);
  const [isOnSale, setIsOnSale] = useState(product?.isOnSale || false);
  const [salePercentage, setSalePercentage] = useState(product?.salePercentage || 0);
  const [isOutOfStock, setIsOutOfStock] = useState(product?.isOutOfStock || false);
  const [loading, setLoading] = useState(false);
  const hasImage = !!image || !!product?.imageUrl;

  const handleSubmit = async () => {
  if (!hasImage) {
    showToast('Selecione uma imagem para continuar', 'warning');
    return;
  }

  try {
    setLoading(true);

    let imageUrl = product?.imageUrl || '';

    if (image) {
      imageUrl = await uploadImage('upload', image, product?.imageUrl);
    }

    const productData = {
      name,
      description,
      price: parseFloat(price) || 0,
      isOnSale,
      salePercentage,
      isOutOfStock,
      isActive: true,
      categoryId,
      imageUrl,
    };
    if (product) {
      const response = await updateProduct(product.id, productData);
      showToast(response?.message, 'success');
    } else {
      const response = await createProduct(productData);
      showToast(response?.message, 'success');
    }

    onSuccess();
    onClose();
  } catch (error: unknown) {
    showToast(getErrorMessage(error, 'Erro inesperado'), 'error');
  } finally {
    setLoading(false);
  }
};


  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{product ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            fullWidth
          />

          <TextField
            label="Preço"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
          />

          <Button variant="outlined" component="label">
            Selecionar Imagem
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImage(file);
              }}
            />
          </Button>
          {hasImage && (
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : product?.imageUrl || '/no-image.png'
                }
                alt="Preview"
                style={{
                  width: 180,
                  height: 180,
                  objectFit: 'cover',
                  borderRadius: 8,
                  border: '1px solid #ddd',
                }}
              />
            </Box>
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={isOnSale}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setIsOnSale(checked);
                  if (!checked) setSalePercentage(0);
                }}
              />
            }
            label="Em promoção"
          />

          {isOnSale && (
            <TextField
              label="% Desconto"
              type="number"
              value={salePercentage}
              onChange={(e) => setSalePercentage(Number(e.target.value))}
              fullWidth
            />
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={isOutOfStock}
                onChange={(e) => setIsOutOfStock(e.target.checked)}
              />
            }
            label="Esgotado"
          />

          <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2, gap: 1 }}>
            <Button onClick={onClose} color="inherit">
              Cancelar
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={
                loading ||
                !name.trim() ||
                !price.trim() ||
                !hasImage
              }
            >
              {loading
                ? 'Salvando...'
                : product
                ? 'Salvar Alterações'
                : 'Cadastrar'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
