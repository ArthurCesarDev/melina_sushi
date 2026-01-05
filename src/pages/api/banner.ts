import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: { bodyParser: false },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Método não permitido',
    });
  }

  const uploadDir = path.join(process.cwd(), 'public', 'banner');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    keepExtensions: true,
    multiples: false,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erro no upload',
      });
    }

    const uploaded = files.file;
    if (!uploaded) {
      return res.status(400).json({
        success: false,
        message: 'Arquivo não enviado',
      });
    }

    const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;
    let oldImageUrl = Array.isArray(fields.oldImageUrl)
      ? fields.oldImageUrl[0]
      : fields.oldImageUrl;

    if (oldImageUrl) {
      const cleanPath = oldImageUrl
        .toString()
        .split('?')[0] 
        .replace(/^\/+/, ''); 

      const oldPath = path.join(
        process.cwd(),
        'public',
        cleanPath
      );

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    const originalName = file.originalFilename || 'banner.png';
    const safeName = `${Date.now()}_${originalName.replace(/\s+/g, '_')}`;
    const targetPath = path.join(uploadDir, safeName);

    fs.renameSync(file.filepath, targetPath);

    return res.status(200).json({
      success: true,
      fileUrl: `/banner/${safeName}`,
    });
  });
}
