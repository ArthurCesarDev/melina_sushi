'use client';
import { Card, CardContent, Typography, TextField, Grid } from '@mui/material';

export default function EmpresaForm({ empresa, setEmpresa }: any) {
  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Informações da Empresa
        </Typography>

        <Grid container spacing={2}>
          <Grid>
            <TextField
              label="Nome da Empresa"
              fullWidth
              value={empresa.nome}
              onChange={(e) =>
                setEmpresa((prev: any) => ({ ...prev, nome: e.target.value }))
              }
            />
          </Grid>

          <Grid>
            <TextField
              label="Descrição"
              multiline
              rows={3}
              fullWidth
              value={empresa.descricao}
              onChange={(e) =>
                setEmpresa((prev: any) => ({ ...prev, descricao: e.target.value }))
              }
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
