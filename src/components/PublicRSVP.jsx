import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Heart, Mail, Phone, AlertCircle, CheckCircle } from 'lucide-react';

const PublicRSVP = ({ eventId }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  
  // RSVP Form State
  const [rsvpData, setRsvpData] = useState({
    attendanceStatus: '', // 'yes', 'maybe', 'no'
    attendeeName: '',
    attendeeEmail: '',
    attendeePhone: '',
    guestCount: 0,
    guestNames: [],
    volunteerOpportunities: [],
    dietaryRestrictions: '',
    accessibilityNeeds: '',
    contactPreferences: {
      email: true,
      sms: false
    },
    comments: ''
  });

  // Mock event data - in real app, this would come from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvent({
        id: eventId || 'fall-festival-2024',
        title: 'Fall Festival 2024',
        date: '2024-10-15',
        time: '10:00 AM - 4:00 PM',
        location: 'Lincoln Elementary School Gymnasium',
        address: '123 School Street, Anytown, ST 12345',
        description: 'Join us for a fun-filled day of games, food, and community spirit! This annual event brings our school community together for an unforgettable celebration.',
        organizer: 'Lincoln Elementary PTO',
        organizerEmail: 'events@lincolnpto.org',
        organizerPhone: '(555) 123-4567',
        maxAttendees: 300,
        currentAttendees: 187,
        requiresRSVP: true,
        allowGuests: true,
        maxGuestsPerFamily: 4,
        hasWaitlist: true,
        rsvpDeadline: '2024-10-12',
        volunteerOpportunities: [
          { id: 1, title: 'Setup Crew', description: 'Help set up tables, decorations, and game stations', slotsNeeded: 5, slotsAvailable: 2, timeCommitment: '8:00 AM - 10:00 AM' },
          { id: 2, title: 'Food Service', description: 'Serve food and manage the concession stand', slotsNeeded: 8, slotsAvailable: 3, timeCommitment: '11:00 AM - 2:00 PM' },
          { id: 3, title: 'Games Coordinator', description: 'Run game stations and activities for kids', slotsNeeded: 4, slotsAvailable: 1, timeCommitment: '10:00 AM - 3:00 PM' },
          { id: 4, title: 'Cleanup Crew', description: 'Help clean up after the event', slotsNeeded: 6, slotsAvailable: 4, timeCommitment: '4:00 PM - 5:30 PM' }
        ],
        images: [
          '/images/fall-festival-1.jpg',
          '/images/fall-festival-2.jpg'
        ]
      });
      setLoading(false);
    }, 1000);
  }, [eventId]);

  const handleInputChange = (field, value) => {
    setRsvpData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGuestCountChange = (count) => {
    const newCount = Math.max(0, Math.min(count, event?.maxGuestsPerFamily || 4));
    setRsvpData(prev => ({
      ...prev,
      guestCount: newCount,
      guestNames: Array(newCount).fill('').map((_, i) => prev.guestNames[i] || '')
    }));
  };

  const handleGuestNameChange = (index, name) => {
    setRsvpData(prev => ({
      ...prev,
      guestNames: prev.guestNames.map((guest, i) => i === index ? name : guest)
    }));
  };

  const handleVolunteerToggle = (opportunityId) => {
    setRsvpData(prev => ({
      ...prev,
      volunteerOpportunities: prev.volunteerOpportunities.includes(opportunityId)
        ? prev.volunteerOpportunities.filter(id => id !== opportunityId)
        : [...prev.volunteerOpportunities, opportunityId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!rsvpData.attendeeName.trim()) {
        throw new Error('Please enter your name');
      }
      if (!rsvpData.attendeeEmail.trim()) {
        throw new Error('Please enter your email address');
      }
      if (!rsvpData.attendanceStatus) {
        throw new Error('Please select your attendance status');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, this would be an API call to backend
      console.log('RSVP Submitted:', {
        eventId: event.id,
        ...rsvpData,
        submittedAt: new Date().toISOString()
      });

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h1>
          <p className="text-gray-600">The event you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white rounded-lg shadow-lg p-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">RSVP Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your response to <strong>{event.title}</strong>. 
            {rsvpData.attendanceStatus === 'yes' && " We're excited to see you there!"}
            {rsvpData.attendanceStatus === 'maybe' && " We hope you can make it!"}
            {rsvpData.attendanceStatus === 'no' && " Thanks for letting us know."}
          </p>
          
          {rsvpData.attendanceStatus === 'yes' && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• You'll receive a confirmation email shortly</li>
                <li>• Event reminders will be sent closer to the date</li>
                {rsvpData.volunteerOpportunities.length > 0 && (
                  <li>• Someone will contact you about your volunteer roles</li>
                )}
                <li>• Contact {event.organizerEmail} with any questions</li>
              </ul>
            </div>
          )}

          <div className="text-sm text-gray-500">
            <p>Need to change your RSVP? Contact {event.organizerEmail}</p>
          </div>
        </div>
      </div>
    );
  }

  const capacityPercentage = (event.currentAttendees / event.maxAttendees) * 100;
  const spotsRemaining = event.maxAttendees - event.currentAttendees;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-Optimized Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="text-center sm:flex sm:items-center sm:justify-between">
            <div className="mb-2 sm:mb-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Event RSVP</h1>
              <p className="text-sm sm:text-base text-gray-600">
                Please respond by {new Date(event.rsvpDeadline).toLocaleDateString()}
              </p>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-sm text-gray-500">{event.organizer}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Event Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white mb-6">
                <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-3" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-0.5" />
                    <div>
                      <div>{event.location}</div>
                      <div className="text-sm opacity-90">{event.address}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">{event.description}</p>
              </div>

              {/* Capacity */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Event Capacity</span>
                  <span className="text-sm text-gray-600">{event.currentAttendees} of {event.maxAttendees}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {spotsRemaining > 0 ? `${spotsRemaining} spots remaining` : 'Event is full - join waitlist'}
                </p>
              </div>

              {/* Contact Info */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Questions?</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <a href={`mailto:${event.organizerEmail}`} className="hover:text-blue-600">
                      {event.organizerEmail}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <a href={`tel:${event.organizerPhone}`} className="hover:text-blue-600">
                      {event.organizerPhone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RSVP Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your RSVP Response</h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-red-700">{error}</span>
                  </div>
                </div>
              )}

              {/* Attendance Status */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Will you be attending? *
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { value: 'yes', label: "Yes, I'll be there!", color: 'green', icon: CheckCircle },
                    { value: 'maybe', label: 'Maybe', color: 'yellow', icon: AlertCircle },
                    { value: 'no', label: "Can't make it", color: 'red', icon: AlertCircle }
                  ].map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleInputChange('attendanceStatus', option.value)}
                        className={`p-4 sm:p-6 rounded-lg border-2 transition-all min-h-[80px] sm:min-h-[100px] ${
                          rsvpData.attendanceStatus === option.value
                            ? `border-${option.color}-500 bg-${option.color}-50`
                            : 'border-gray-200 hover:border-gray-300 active:border-gray-400'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${
                          rsvpData.attendanceStatus === option.value
                            ? `text-${option.color}-600`
                            : 'text-gray-400'
                        }`} />
                        <div className={`font-medium ${
                          rsvpData.attendanceStatus === option.value
                            ? `text-${option.color}-900`
                            : 'text-gray-700'
                        }`}>
                          {option.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={rsvpData.attendeeName}
                    onChange={(e) => handleInputChange('attendeeName', e.target.value)}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={rsvpData.attendeeEmail}
                    onChange={(e) => handleInputChange('attendeeEmail', e.target.value)}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                  <input
                    type="tel"
                    value={rsvpData.attendeePhone}
                    onChange={(e) => handleInputChange('attendeePhone', e.target.value)}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(555) 123-4567"
                  />
              </div>

              {/* Guest Information - Only show if attending */}
              {rsvpData.attendanceStatus === 'yes' && event.allowGuests && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Guest Information
                  </h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-blue-800 mb-2">
                      Number of guests (Maximum {event.maxGuestsPerFamily})
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => handleGuestCountChange(rsvpData.guestCount - 1)}
                        className="w-8 h-8 rounded-full bg-blue-200 hover:bg-blue-300 flex items-center justify-center"
                        disabled={rsvpData.guestCount <= 0}
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold text-blue-900 w-8 text-center">
                        {rsvpData.guestCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleGuestCountChange(rsvpData.guestCount + 1)}
                        className="w-8 h-8 rounded-full bg-blue-200 hover:bg-blue-300 flex items-center justify-center"
                        disabled={rsvpData.guestCount >= event.maxGuestsPerFamily}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {rsvpData.guestCount > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-blue-800 mb-2">
                        Guest Names (Optional)
                      </label>
                      <div className="space-y-2">
                        {rsvpData.guestNames.map((name, index) => (
                          <input
                            key={index}
                            type="text"
                            value={name}
                            onChange={(e) => handleGuestNameChange(index, e.target.value)}
                            className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder={`Guest ${index + 1} name`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Volunteer Opportunities - Only show if attending */}
              {rsvpData.attendanceStatus === 'yes' && event.volunteerOpportunities.length > 0 && (
                <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Volunteer Opportunities
                  </h3>
                  <p className="text-sm text-green-800 mb-4">
                    Help make this event amazing! Select any volunteer opportunities you're interested in.
                  </p>
                  
                  <div className="space-y-3">
                    {event.volunteerOpportunities.map((opportunity) => (
                      <div key={opportunity.id} className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id={`volunteer-${opportunity.id}`}
                          checked={rsvpData.volunteerOpportunities.includes(opportunity.id)}
                          onChange={() => handleVolunteerToggle(opportunity.id)}
                          className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`volunteer-${opportunity.id}`} className="flex-1">
                          <div className="font-medium text-green-900">{opportunity.title}</div>
                          <div className="text-sm text-green-700">{opportunity.description}</div>
                          <div className="text-xs text-green-600 mt-1">
                            {opportunity.timeCommitment} • {opportunity.slotsAvailable} of {opportunity.slotsNeeded} spots available
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Information - Only show if attending */}
              {rsvpData.attendanceStatus === 'yes' && (
                <div className="mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dietary Restrictions
                      </label>
                      <input
                        type="text"
                        value={rsvpData.dietaryRestrictions}
                        onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Vegetarian, Gluten-free, Nut allergy"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accessibility Needs
                      </label>
                      <input
                        type="text"
                        value={rsvpData.accessibilityNeeds}
                        onChange={(e) => handleInputChange('accessibilityNeeds', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Wheelchair access, Large print"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Preferences */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How would you like to receive event updates?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rsvpData.contactPreferences.email}
                      onChange={(e) => handleInputChange('contactPreferences', {
                        ...rsvpData.contactPreferences,
                        email: e.target.checked
                      })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Email notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rsvpData.contactPreferences.sms}
                      onChange={(e) => handleInputChange('contactPreferences', {
                        ...rsvpData.contactPreferences,
                        sms: e.target.checked
                      })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">SMS text messages</span>
                  </label>
                </div>
              </div>

              {/* Comments */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Comments (Optional)
                </label>
                <textarea
                  value={rsvpData.comments}
                  onChange={(e) => handleInputChange('comments', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any questions or special requests?"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center sm:justify-end">
                <button
                  type="submit"
                  disabled={submitting || !rsvpData.attendanceStatus || !rsvpData.attendeeName || !rsvpData.attendeeEmail}
                  className="w-full sm:w-auto px-8 py-4 text-lg bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[56px] touch-manipulation"
                >
                  {submitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Submitting RSVP...
                    </div>
                  ) : (
                    'Submit RSVP'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicRSVP;
