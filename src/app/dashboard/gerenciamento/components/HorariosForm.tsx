'use client';
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { DayRow } from './styles';

export default function HorariosForm({ empresa, setEmpresa }: any) {
  const toggleDia = (index: number) => {
    setEmpresa((prev: any) => {
      const horarios = [...prev.horarios];
      horarios[index].ativo = !horarios[index].ativo;
      return { ...prev, horarios };
    });
  };

  const handleHorarioChange = (index: number, campo: 'abertura' | 'fechamento', value: string) => {
    setEmpresa((prev: any) => {
      const horarios = [...prev.horarios];
      horarios[index][campo] = value;
      return { ...prev, horarios };
    });
  };

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Horários de Funcionamento
        </Typography>

        {empresa.horarios.map((item: any, index: number) => (
          <DayRow key={item.dia}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.ativo}
                  onChange={() => toggleDia(index)}
                  color="primary"
                />
              }
              label={item.dia}
              sx={{ minWidth: 120 }}
            />

            <TextField
              label="Abre"
              type="time"
              size="small"
              value={item.abertura}
              onChange={(e) => handleHorarioChange(index, 'abertura', e.target.value)}
              disabled={!item.ativo}
            />
            <TextField
              label="Fecha"
              type="time"
              size="small"
              value={item.fechamento}
              onChange={(e) => handleHorarioChange(index, 'fechamento', e.target.value)}
              disabled={!item.ativo}
            />
          </DayRow>
        ))}
      </CardContent>
    </Card>
  );
}
