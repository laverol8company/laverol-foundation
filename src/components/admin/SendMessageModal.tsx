import { useState, useEffect } from 'react';
import { Lead } from '../../types/crm';
import { MessageSquare, Send, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface SendMessageModalProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SendMessageModal({ lead, open, onOpenChange }: SendMessageModalProps) {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (open && lead) {
      setMessage(lead.cold_message_hook || '');
    }
  }, [open, lead]);

  const handleSend = async () => {
    if (!lead) return;
    setSending(true);

    const payload = {
      lead_id: lead.id,
      business_name: lead.business_name,
      recipient_email: lead.email,
      message: message,
      recommended_offer: lead.recommended_offer,
      outreach_priority: lead.outreach_priority
    };

    console.log("Sending webhook payload:", payload);

    setTimeout(() => {
      setSending(false);
      setMessage('');
      onOpenChange(false);
    }, 1000);
  };

  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" /> Send Message
          </DialogTitle>
          <DialogDescription>
            Send a customized outreach message to {lead.business_name || 'this lead'}.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {lead.recommended_offer && (
            <div className="glass p-3 rounded-lg border border-amber-500/30 bg-amber-500/5">
              <p className="text-xs text-amber-500 font-semibold mb-1 flex items-center uppercase tracking-wider">
                <Sparkles className="w-3 h-3 mr-1" /> Recommended Offer
              </p>
              <p className="text-sm font-medium">{lead.recommended_offer}</p>
            </div>
          )}

          <Textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[150px] resize-none border-border/50 focus:border-primary"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={sending}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={!message.trim() || sending}>
            {sending ? 'Sending...' : <><Send className="w-4 h-4 mr-2" /> Send</>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
