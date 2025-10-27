// dashboard/page.tsx

'use client';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';
import { styled } from '@mui/system';

// ====== ESTILOS ======
const PageContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
}));

const KPIContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const KPIIcon = styled('div')(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main + '22',
  marginBottom: theme.spacing(1),
}));

// ====== COMPONENTE ======
export default function DashboardPage() {
  const kpis = [
    {
      title: 'Faturamento',
      value: 'R$ 32.480',
      icon: DollarSign,
      change: '+12.5%',
    },
    {
      title: 'Clientes',
      value: '248',
      icon: Users,
      change: '+8.1%',
    },
    {
      title: 'Pedidos',
      value: '391',
      icon: ShoppingBag,
      change: '+5.2%',
    },
    {
      title: 'Crescimento',
      value: '9.3%',
      icon: TrendingUp,
      change: '+1.1%',
    },
  ];

  return (
    <PageContainer>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Relatório Geral 
      </Typography>


      {/* ==== KPIs ==== */}
      <KPIContainer container spacing={2}>
        {kpis.map((kpi) => (
          <Grid  key={kpi.title}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                transition: 'transform 0.2s ease',
                '&:hover': { transform: 'translateY(-4px)' },
              }}
            >
              <CardContent>
                <KPIIcon>
                  <kpi.icon size={22} color="#ff6b00" />
                </KPIIcon>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  {kpi.title}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {kpi.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'success.main', fontWeight: 500, marginTop: 0.5 }}
                >
                  {kpi.change}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </KPIContainer>
    </PageContainer>
  );
}
