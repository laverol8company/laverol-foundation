import { useEffect, useState } from 'react';
import { Lead, Contact } from '../../types/crm';
import { fetchContactsByLeadId } from '../../lib/crmApi';
import { Loader2, User, Phone, Mail, Calendar, MessageSquare } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Button } from "../ui/button";

interface LeadDrawerProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LeadDrawer({ lead, open, onOpenChange }: LeadDrawerProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && lead) {
      const loadContacts = async () => {
        setLoading(true);
        try {
          const data = await fetchContactsByLeadId(lead.id);
          setContacts(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      loadContacts();
    }
  }, [open, lead]);

  if (!lead) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="glass-strong">
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle className="text-2xl flex items-center">
              <User className="mr-2" /> {lead.name || 'Unknown Lead'}
            </DrawerTitle>
            <DrawerDescription>
              Lead Details & Communication History
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-3 rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground flex items-center"><Phone className="w-4 h-4 mr-2" /> Phone</p>
                <p className="font-medium">{lead.phone || 'N/A'}</p>
              </div>
              <div className="glass p-3 rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground flex items-center"><Mail className="w-4 h-4 mr-2" /> Email</p>
                <p className="font-medium">{lead.email || 'N/A'}</p>
              </div>
              <div className="glass p-3 rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground flex items-center"><Calendar className="w-4 h-4 mr-2" /> Created At</p>
                <p className="font-medium">{new Date(lead.created_at).toLocaleDateString()}</p>
              </div>
              <div className="glass p-3 rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground flex items-center"><MessageSquare className="w-4 h-4 mr-2" /> Status</p>
                <p className="font-medium capitalize">{lead.status.replace('_', ' ')}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-3">Contacts History</h3>
              {loading ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : contacts.length === 0 ? (
                <div className="text-center p-4 text-muted-foreground bg-muted/20 rounded-lg">
                  No contacts found.
                </div>
              ) : (
                <div className="space-y-3">
                  {contacts.map(contact => (
                    <div key={contact.id} className="p-3 border border-border/50 rounded-lg bg-background/50">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm">{contact.contact_method}</span>
                        <span className="text-xs text-muted-foreground">{new Date(contact.created_at).toLocaleString()}</span>
                      </div>
                      <p className="text-sm">{contact.notes}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
