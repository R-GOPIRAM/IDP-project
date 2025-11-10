// BargainChat.tsx
import React, { useState, useRef, useEffect } from 'react';
import Button from '../common/Button';

/**
 * UI-only bargain chat. Responses are simulated locally (no backend calls).
 */
export default function BargainChat({ product, onClose }: any) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement|null>(null);

  useEffect(() => {
    // Intro message
    setMessages([`Shop: Hi! Interested in ${product.name}? Send your offer.`]);
  }, [product]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const simulateReply = (offerNum: number) => {
    // Simple simulated negotiation logic
    const orig = product.price;
    const minAcceptable = Math.floor(orig * 0.85);
    if (offerNum >= orig) return `Shop: Deal accepted at ₹${offerNum}. Preparing order.`;
    if (offerNum >= minAcceptable) {
      const counter = Math.floor((offerNum + orig) / 2);
      return `Shop: I can do ₹${counter}. Deal?`;
    }
    return `Shop: That's too low. Minimum I can consider is around ₹${minAcceptable}.`;
  };

  const send = () => {
    if (!input) return;
    setMessages(prev => [...prev, `You: I offer ₹${input}`]);
    setLoading(true);
    const offerNum = parseInt(input, 10);
    setTimeout(() => {
      setMessages(prev => [...prev, simulateReply(offerNum)]);
      setLoading(false);
    }, 900);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg">Bargain with {product.seller?.name || 'Shop'}</h3>
            <div className="text-xs text-gray-500">{product.seller?.address}</div>
          </div>
          <button onClick={onClose} className="text-gray-600">Close</button>
        </div>

        <div ref={listRef} className="h-64 overflow-y-auto bg-gray-50 p-3 rounded-md space-y-2">
          {messages.map((m,i) => (
            <div key={i} className={`${m.startsWith('You:') ? 'text-right' : 'text-left'}`}>
              <div className={`${m.startsWith('You:') ? 'inline-block bg-green-600 text-white px-3 py-1 rounded-lg' : 'inline-block bg-white border px-3 py-1 rounded-lg shadow-sm'}`}>
                {m}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex gap-2">
          <input type="number" value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter your offer (₹)" className="flex-1 border rounded-md px-3 py-2" />
          <Button onClick={send} disabled={loading} className="bg-green-600 text-white">Send</Button>
        </div>
      </div>
    </div>
  );
}
