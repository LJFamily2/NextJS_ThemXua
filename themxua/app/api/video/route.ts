import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function streamFile(
  filePath: string,
  options?: { start?: number; end?: number }
): ReadableStream {
  const nodeStream = fs.createReadStream(filePath, options);
  return new ReadableStream({
    start(controller) {
      nodeStream.on('data', chunk =>
        controller.enqueue(new Uint8Array(chunk as unknown as ArrayBuffer))
      );
      nodeStream.on('end', () => controller.close());
      nodeStream.on('error', err => controller.error(err));
    },
    cancel() {
      nodeStream.destroy();
    },
  });
}

export async function GET(req: Request) {
  const filePath = path.join(
    process.cwd(),
    'public',
    'Thềm Xưa Cảm ơn và Tạm biệt(2).mp4'
  );

  if (!fs.existsSync(filePath)) {
    return new NextResponse('Video not found', { status: 404 });
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.get('range');

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = end - start + 1;
    const readableStream = streamFile(filePath, { start, end });

    return new NextResponse(readableStream, {
      status: 206,
      headers: {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize.toString(),
        'Content-Type': 'video/mp4',
      },
    });
  } else {
    const readableStream = streamFile(filePath);

    return new NextResponse(readableStream, {
      status: 200,
      headers: {
        'Content-Length': fileSize.toString(),
        'Content-Type': 'video/mp4',
      },
    });
  }
}
