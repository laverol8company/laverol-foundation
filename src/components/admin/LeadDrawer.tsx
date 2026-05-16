import { useEffect, useState } from 'react';
import { Lead, Contact } from '../../types/crm';
import { fetchContactsByLeadId } from '../../lib/crmApi';
import { Loader2, User, Phone, MapPin, Globe, Star, CheckCircle2, XCircle, Mail } from 'lucide-react';
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

  const scoreColor = lead.score && lead.score >= 70 ? 'text-green-500' : lead.score && lead.score >= 40 ? 'text-yellow-500' : 'text-red-500';

  const renderAuditFlag = (label: string, value: boolean | null | undefined, numValue?: number | null) => (
    <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
      <span className="text-sm">{label}</span>
      <span className="font-medium flex items-center">
        {value === true ? <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" /> : value === false ? <XCircle className="w-4 h-4 text-red-500 mr-2" /> : null}
        {numValue !== undefined ? numValue : value ? 'Yes' : 'No'}
      </span>
    </div>
  );

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="glass-strong">
        <div className="mx-auto w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar p-4">
          <DrawerHeader>
            <DrawerTitle className="text-2xl flex items-center">
              {lead.business_name || 'Unknown Lead'}
            </DrawerTitle>
            <DrawerDescription>
              Lead Details & Communication History
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {/* Section 1 - Business Info */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Business Info</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass p-3 rounded-lg border border-border/50">
                    <p className="text-sm text-muted-foreground flex items-center"><Phone className="w-4 h-4 mr-2" /> Phone</p>
                    <p className="font-medium">{lead.phone || 'N/A'}</p>
                  </div>
                  <div className="glass p-3 rounded-lg border border-border/50">
                    <p className="text-sm text-muted-foreground flex items-center"><Globe className="w-4 h-4 mr-2" /> Website</p>
                    <p className="font-medium truncate" title={lead.website_url || ''}>{lead.website_url || 'N/A'}</p>
                  </div>
                  <div className="glass p-3 rounded-lg border border-border/50">
                    <p className="text-sm text-muted-foreground flex items-center"><MapPin className="w-4 h-4 mr-2" /> Address</p>
                    <p className="font-medium truncate" title={lead.address || ''}>{lead.address || 'N/A'}</p>
                  </div>
                  <div className="glass p-3 rounded-lg border border-border/50">
                    <p className="text-sm text-muted-foreground flex items-center"><Star className="w-4 h-4 mr-2" /> Rating</p>
                    <p className="font-medium">{lead.rating ? `${lead.rating} (${lead.review_count} reviews)` : 'N/A'}</p>
                  </div>
                  <div className="glass p-3 rounded-lg border border-border/50">
                    <p className="text-sm text-muted-foreground">Price Range</p>
                    <p className="font-medium">{lead.price_range || 'N/A'}</p>
                  </div>
                  <div className="glass p-3 rounded-lg border border-border/50">
                    <p className="text-sm text-muted-foreground">Business Vibe</p>
                    <p className="font-medium">{lead.business_vibe || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Section 2 - Scoring */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Scoring</h3>
                <div className="glass p-4 rounded-xl border border-border/50 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Score</span>
                    <span className={`text-3xl font-bold ${scoreColor}`}>{lead.score || 0}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Block A:</span> <span className="font-medium">{lead.score_block_a || 0}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Block B:</span> <span className="font-medium">{lead.score_block_b || 0}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Penalties:</span> <span className="font-medium text-red-400">{lead.score_penalties || 0}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Priority:</span> <span className="font-medium uppercase">{lead.outreach_priority || 'NONE'}</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Section 3 - Audit Flags */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Audit Flags</h3>
                <div className="glass p-4 rounded-xl border border-border/50">
                  {renderAuditFlag('Has Website', lead.has_website)}
                  {renderAuditFlag('Has Booking System', lead.audit_has_booking)}
                  {renderAuditFlag('Mobile Ready', lead.audit_mobile_ready)}
                  {renderAuditFlag('Has Apple Pay', lead.audit_has_apple_pay)}
                  {renderAuditFlag('Legacy Tech', lead.audit_legacy_tech)}
                  {renderAuditFlag('SEO Score', undefined, lead.audit_seo_score)}
                </div>
              </div>

              {/* Section 4 - AI Insights */}
              <div>
                <h3 className="font-semibold text-lg mb-3">AI Insights</h3>
                <div className="space-y-3">
                  <div className="glass p-3 rounded-lg border border-border/50 bg-primary/5">
                    <p className="text-xs text-primary font-semibold mb-1 uppercase tracking-wider">AI Summary</p>
                    <p className="text-sm">{lead.ai_summary || 'No summary available.'}</p>
                  </div>
                  <div className="glass p-3 rounded-lg border border-border/50 bg-amber-500/5">
                    <p className="text-xs text-amber-500 font-semibold mb-1 uppercase tracking-wider">Recommended Offer</p>
                    <p className="text-sm">{lead.recommended_offer || 'N/A'}</p>
                  </div>
                  <div className="glass p-3 rounded-lg border border-border/50 bg-blue-500/5">
                    <p className="text-xs text-blue-500 font-semibold mb-1 uppercase tracking-wider">Cold Message Hook</p>
                    <p className="text-sm">{lead.cold_message_hook || 'N/A'}</p>
                  </div>
                  <div className="glass p-3 rounded-lg border border-border/50">
                    <p className="text-xs text-muted-foreground font-semibold mb-1 uppercase tracking-wider">Recent Review Snippet</p>
                    <p className="text-sm italic">"{lead.recent_review_snippet || 'No reviews'}"</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5 - Contacts */}
            <div className="md:col-span-2 mt-2">
              <h3 className="font-semibold text-lg mb-3">Contacts</h3>
              {loading ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : contacts.length === 0 ? (
                <div className="text-center p-4 text-muted-foreground glass rounded-lg">
                  No contacts found.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {contacts.map(contact => (
                    <div key={contact.id} className="p-3 border border-border/50 rounded-lg glass">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {contact.full_name || 'Unknown'}
                        </span>
                        <span className="text-xs px-2 py-1 bg-muted rounded-full">{contact.title || 'No Title'}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2 space-y-1">
                        {contact.email && <div className="flex items-center"><Mail className="w-3 h-3 mr-2" /> {contact.email}</div>}
                        {contact.phone && <div className="flex items-center"><Phone className="w-3 h-3 mr-2" /> {contact.phone}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DrawerFooter className="mt-4 border-t border-border/50 pt-4">
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
