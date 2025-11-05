import { memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Image as ImageIcon, Video, Type, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { RumblWordmark } from '@/components/branding';

const CreateEventScreen = memo(function CreateEventScreen() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'flyer' | 'video' | 'font' | 'theme'>('flyer');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showOnExplore, setShowOnExplore] = useState(true);
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [enableActivity, setEnableActivity] = useState(true);
  const [hasShownTip, setHasShownTip] = useState(false);
  const [isFreeEvent, setIsFreeEvent] = useState(true);
  const [entryRequired, setEntryRequired] = useState(false);
  const [showGuestlist, setShowGuestlist] = useState(true);

  // Aesthetic placeholder images carousel
  const aestheticImages = [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=1200&fit=crop',
  ];

  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % aestheticImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Show tip toast on first interaction with image/title
  const showTipToast = () => {
    if (!hasShownTip) {
      toast.info("Pro Tip 💡", {
        description: "Great image + title = half the work done! Focus on these first.",
        duration: 5000,
        position: "top-center",
        style: {
          top: '270px',
        },
      });
      setHasShownTip(true);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateEvent = () => {
    console.log('Creating event...');
    navigate('/events');
  };

  const mediaOptions = [
    { id: 'flyer', label: 'Flyer', icon: ImageIcon },
    { id: 'video', label: 'Video', icon: Video },
    { id: 'font', label: 'Font', icon: Type },
    { id: 'theme', label: 'Theme', icon: Palette },
  ] as const;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Sticky Header with Cancel, Logo, Create - stays within phone viewport */}
      <div className="sticky top-0 z-50 bg-background border-b border-border py-3 safe-top-with-island">
        <div className="flex items-center justify-between px-1.5 safe-left safe-right">
          <Button
            variant="ghost"
            onClick={() => navigate('/events')}
            className="text-base font-medium text-foreground hover:bg-transparent h-auto py-2"
          >
            Cancel
          </Button>
          <RumblWordmark size="small" className="opacity-80" />
          <Button
            onClick={handleCreateEvent}
            className="text-base font-semibold text-primary hover:text-primary/90 bg-transparent hover:bg-transparent h-auto py-2"
          >
            Create
          </Button>
        </div>
      </div>

      {/* Sticky Media Type Tabs - sticks below header */}
      <div className="sticky top-[60px] z-40 bg-background">
        <div className="grid grid-cols-4 border-b border-border bg-card">
          {mediaOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setSelectedTab(option.id)}
                className={`flex flex-col items-center justify-center py-4 transition-colors ${
                  selectedTab === option.id
                    ? 'bg-primary/10 border-b-2 border-primary'
                    : 'hover:bg-muted/50'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${selectedTab === option.id ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-xs font-medium ${selectedTab === option.id ? 'text-primary' : 'text-muted-foreground'}`}>
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content - scrollable area */}
      <div className="flex-1 overflow-y-auto pb-24 relative">

        {/* Event Title - Large with placeholder - ABOVE image */}
        <div className="px-1.5 pt-6 pb-4">
          <Input
            type="text"
            placeholder="Untitled Event"
            onClick={showTipToast}
            className="h-16 text-2xl font-bold bg-card border-2 border-border focus:border-primary placeholder:text-muted-foreground/40 transition-colors"
          />
        </div>

        {/* Event Image/Flyer - Full Width Aesthetic */}
        <div className="relative h-80 overflow-hidden" onClick={showTipToast}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="sr-only"
            id="event-flyer-upload"
          />
          <label htmlFor="event-flyer-upload" className="block h-full cursor-pointer">
            {selectedImage ? (
              <div className="relative h-full">
                <img
                  src={selectedImage}
                  alt="Event flyer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                  <p className="text-white text-2xl font-bold mb-4">Design your event page</p>
                  <Button variant="secondary" size="lg" className="rounded-full">
                    Change Flyer
                  </Button>
                </div>
              </div>
            ) : (
              <div className="relative h-full">
                <img
                  src={aestheticImages[currentPlaceholder]}
                  alt=""
                  className="w-full h-full object-cover opacity-40 transition-opacity duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 flex flex-col items-center justify-center">
                  <p className="text-white text-2xl font-bold mb-4">Design your event page</p>
                  <Button variant="secondary" size="lg" className="rounded-full">
                    Upload Flyer
                  </Button>
                </div>
              </div>
            )}
          </label>
        </div>

        {/* Gap between image and form fields */}
        <div className="h-6" />

        <div className="px-1.5 pb-6 space-y-4">
          {/* Connected Date/Time Fields Group - Single Row */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-2">
              {/* Start Time */}
              <div className="relative border-r border-border">
                <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Start time"
                  className="w-full h-14 bg-transparent pl-9 pr-2 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:bg-muted/30"
                />
              </div>

              {/* End Time */}
              <div className="relative">
                <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="End time"
                  className="w-full h-14 bg-transparent pl-9 pr-2 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:bg-muted/30"
                />
              </div>
            </div>
          </div>

          {/* Connected Location Fields Group */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Venue Name - with map pin icon */}
            <div className="relative border-b border-border">
              <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Add location"
                className="w-full h-14 bg-transparent pl-9 pr-2 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:bg-muted/30"
              />
            </div>

            {/* Address Details */}
            <div className="relative">
              <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Address (optional)"
                className="w-full h-14 bg-transparent pl-9 pr-2 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:bg-muted/30"
              />
            </div>
          </div>

          {/* Event Preview - What it will look like */}
          <div className="bg-card border-2 border-primary/20 rounded-xl overflow-hidden">
            {/* Preview Label */}
            <div className="px-4 py-2 bg-primary/5 border-b border-primary/10">
              <p className="text-xs font-semibold text-primary uppercase tracking-wide">Live Preview</p>
            </div>

            {/* Preview Content */}
            <div className="p-4">
              {/* Event Image Preview */}
              <div className="relative rounded-lg overflow-hidden mb-4 h-48">
                <img
                  src={selectedImage || aestheticImages[currentPlaceholder]}
                  alt="Event preview"
                  className="w-full h-full object-cover"
                />

                {/* Event Type Badge - Top Right */}
                <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 items-end">
                  {isFreeEvent ? (
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-lg" style={{ boxShadow: '0 0 6px rgba(52, 211, 153, 0.8)' }} />
                      <span className="text-[10px] font-bold text-emerald-300">Free</span>
                    </div>
                  ) : entryRequired ? (
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-lg" style={{ boxShadow: '0 0 6px rgba(96, 165, 250, 0.8)' }} />
                      <span className="text-[10px] font-bold text-blue-300">Entry Required</span>
                    </div>
                  ) : null}
                </div>

                {/* Attendee Avatars on Preview */}
                {showGuestlist && (
                  <div className="absolute bottom-3 left-3 flex items-center">
                    <div className="flex -space-x-2">
                      <img
                        src="https://i.pravatar.cc/150?img=1"
                        alt=""
                        className="w-8 h-8 rounded-full border-2 border-background"
                      />
                      <img
                        src="https://i.pravatar.cc/150?img=2"
                        alt=""
                        className="w-8 h-8 rounded-full border-2 border-background"
                      />
                      <img
                        src="https://i.pravatar.cc/150?img=3"
                        alt=""
                        className="w-8 h-8 rounded-full border-2 border-background"
                      />
                      <div className="w-8 h-8 rounded-full border-2 border-background bg-primary/90 flex items-center justify-center">
                        <span className="text-[10px] font-semibold text-primary-foreground">+12</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Event Details Preview */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground">
                  Untitled Event
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>TBD</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Location TBD</span>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">15 people interested</p>
                </div>
              </div>
            </div>
          </div>

          {/* Event Description */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <textarea
              placeholder="Add description (optional)"
              className="w-full min-h-32 bg-transparent px-3 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:bg-muted/30 resize-none"
            />
          </div>

          {/* Settings Group */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 h-14 border-b border-border">
              <span className="text-base text-foreground">Free Event</span>
              <Switch checked={isFreeEvent} onCheckedChange={setIsFreeEvent} />
            </div>

            <div className="flex items-center justify-between px-4 h-14 border-b border-border">
              <span className="text-base text-foreground">Entry Required</span>
              <Switch checked={entryRequired} onCheckedChange={setEntryRequired} />
            </div>

            <div className="flex items-center justify-between px-4 h-14 border-b border-border">
              <span className="text-base text-foreground">Show Guestlist</span>
              <Switch checked={showGuestlist} onCheckedChange={setShowGuestlist} />
            </div>

            <div className="flex items-center justify-between px-4 h-14 border-b border-border">
              <span className="text-base text-foreground">Show on Explore</span>
              <Switch checked={showOnExplore} onCheckedChange={setShowOnExplore} />
            </div>

            <div className="flex items-center justify-between px-4 h-14 border-b border-border">
              <span className="text-base text-foreground">Password Protected</span>
              <Switch checked={passwordProtected} onCheckedChange={setPasswordProtected} />
            </div>

            <div className="flex items-center justify-between px-4 h-14">
              <span className="text-base text-foreground">Enable Activity</span>
              <Switch checked={enableActivity} onCheckedChange={setEnableActivity} />
            </div>
          </div>
        </div>

        {/* Scroll indicator blur - sticky at bottom, covering slight bit of tab bar */}
        <div className="sticky -bottom-2 left-0 right-0 h-8 bg-gradient-to-t from-background/95 via-background/40 to-transparent pointer-events-none z-10 -mb-8 backdrop-blur-sm" />
      </div>
    </div>
  );
});

export default CreateEventScreen;
