import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ success: false, message: 'Método não permitido' });
  }

  const uploadDir = path.join(process.cwd(), 'public', 'produtos');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Erro ao processar upload:', err);
      return res
        .status(500)
        .json({ success: false, message: 'Erro ao fazer upload' });
    }

    const uploaded = files.file;
    if (!uploaded) {
      return res
        .status(400)
        .json({ success: false, message: 'Nenhum arquivo enviado.' });
    }

    const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;

    /* =====================================================
       🔥 REMOVE CACHE BUSTER DA IMAGEM ANTIGA
    ===================================================== */
    let oldImageUrl = Array.isArray(fields.oldImageUrl)
      ? fields.oldImageUrl[0]
      : fields.oldImageUrl;

    if (oldImageUrl) {
      oldImageUrl = oldImageUrl.split('?')[0]; // 🔥 IMPORTANTE

      const oldPath = path.join(
        process.cwd(),
        'public',
        oldImageUrl
      );

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
        console.log(`🗑️ Imagem antiga removida: ${oldPath}`);
      }
    }

    /* =====================================================
       🔹 GERA NOME ÚNICO (SEM CACHE BUG)
    ===================================================== */
    const originalName = file.originalFilename || 'produto';
    const ext = path.extname(originalName);
    const base = path
      .basename(originalName, ext)
      .replace(/\s+/g, '_');

    const safeName = `${Date.now()}_${base}${ext}`;
    const targetPath = path.join(uploadDir, safeName);

    try {
      fs.renameSync(file.filepath, targetPath);

      return res.status(200).json({
        success: true,
        fileUrl: `/produtos/${safeName}`,
        message: 'Upload realizado com sucesso',
      });
    } catch (error) {
      console.error('Erro ao mover arquivo:', error);
      return res
        .status(500)
        .json({ success: false, message: 'Falha ao processar arquivo' });
    }
  });
}
