import ioHandler from '../../lib/socket';

export default function handler(req, res) {
  if (req.method === "GET") {
    ioHandler(req, res);
  }
}