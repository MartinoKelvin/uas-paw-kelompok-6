import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export const BookingSearch = ({ onSearch }) => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        checkIn,
        checkOut,
        guests,
      });
    }
    navigate("/packages");
  };

  return (
    <section className="bg-primary/5 border-border rounded-lg border p-6 md:p-8">
      <div className="space-y-4">
        <h2 className="text-foreground text-xl font-bold md:text-2xl">Find Your Room Here</h2>

        <div className="grid gap-4 md:grid-cols-4">
          {/* Check In */}
          <div className="space-y-2">
            <label className="text-muted-foreground text-sm font-medium">Check In</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? (
                    format(checkIn, "d November yyyy")
                  ) : (
                    <span className="text-muted-foreground">1 November 2024</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check Out */}
          <div className="space-y-2">
            <label className="text-muted-foreground text-sm font-medium">Check Out</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOut ? (
                    format(checkOut, "d November yyyy")
                  ) : (
                    <span className="text-muted-foreground">5 November 2024</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  initialFocus
                  disabled={(date) => (checkIn ? date < checkIn : false)}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <label className="text-muted-foreground text-sm font-medium">Guest</label>
            <Select value={guests.toString()} onValueChange={(value) => setGuests(parseInt(value))}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Adult" : "Adults"} | {num}{" "}
                    {num === 1 ? "Children" : "Children"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
            >
              <Search className="mr-2 h-4 w-4" />
              Search Room
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

BookingSearch.propTypes = {
  onSearch: PropTypes.func,
};
