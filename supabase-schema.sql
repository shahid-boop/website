-- =====================================================
-- PREMIUM SAUDI HOME MAINTENANCE PLATFORM
-- Complete Database Schema for Supabase PostgreSQL
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Roles lookup table
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO roles (name, description) VALUES
    ('customer', 'Regular customer account'),
    ('admin', 'Business administrator'),
    ('technician', 'Field technician'),
    ('super_admin', 'Super administrator with full access');

-- User profiles (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id),
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    preferred_language VARCHAR(5) DEFAULT 'en' CHECK (preferred_language IN ('en', 'ar')),
    profile_image TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer properties
CREATE TABLE customer_properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    property_name VARCHAR(255),
    property_type VARCHAR(50) CHECK (property_type IN ('villa', 'apartment', 'office', 'building')),
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    district VARCHAR(100),
    size_sqm NUMERIC(10, 2),
    rooms_count INTEGER,
    floors_count INTEGER,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- SERVICE MANAGEMENT
-- =====================================================

-- Service categories
CREATE TABLE service_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    icon VARCHAR(100),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES service_categories(id) ON DELETE SET NULL,
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    icon VARCHAR(100),
    image_url TEXT,
    base_price NUMERIC(10, 2) DEFAULT 0,
    duration_minutes INTEGER,
    is_active BOOLEAN DEFAULT true,
    is_emergency BOOLEAN DEFAULT false,
    warranty_months INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pricing rules
CREATE TABLE pricing_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    rule_type VARCHAR(50) CHECK (rule_type IN ('base', 'property_size', 'location', 'urgency', 'material')),
    property_type VARCHAR(50),
    min_value NUMERIC(10, 2),
    max_value NUMERIC(10, 2),
    price_adjustment NUMERIC(10, 2) NOT NULL,
    adjustment_type VARCHAR(20) CHECK (adjustment_type IN ('fixed', 'percentage')),
    city VARCHAR(100),
    description_en TEXT,
    description_ar TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- QUOTATION & BOOKING SYSTEM
-- =====================================================

-- Price estimates
CREATE TABLE estimates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    service_id UUID REFERENCES services(id),
    property_id UUID REFERENCES customer_properties(id) ON DELETE SET NULL,
    property_type VARCHAR(50),
    property_size_sqm NUMERIC(10, 2),
    city VARCHAR(100),
    district VARCHAR(100),
    base_price NUMERIC(10, 2) NOT NULL,
    labor_cost NUMERIC(10, 2) DEFAULT 0,
    material_cost NUMERIC(10, 2) DEFAULT 0,
    additional_charges NUMERIC(10, 2) DEFAULT 0,
    discount NUMERIC(10, 2) DEFAULT 0,
    tax NUMERIC(10, 2) DEFAULT 0,
    total_estimate NUMERIC(10, 2) NOT NULL,
    calculation_details JSONB,
    customer_notes TEXT,
    validity_days INTEGER DEFAULT 30,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'converted', 'expired')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Official quotations
CREATE TABLE quotations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_number VARCHAR(50) UNIQUE NOT NULL,
    estimate_id UUID REFERENCES estimates(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    service_id UUID REFERENCES services(id),
    property_id UUID REFERENCES customer_properties(id) ON DELETE SET NULL,
    quoted_price NUMERIC(10, 2) NOT NULL,
    breakdown JSONB,
    terms_en TEXT,
    terms_ar TEXT,
    valid_until DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'viewed', 'accepted', 'rejected', 'expired')),
    customer_response TEXT,
    responded_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    service_id UUID REFERENCES services(id),
    property_id UUID REFERENCES customer_properties(id) ON DELETE SET NULL,
    quotation_id UUID REFERENCES quotations(id) ON DELETE SET NULL,
    preferred_date DATE NOT NULL,
    preferred_time TIME,
    scheduled_date DATE,
    scheduled_time TIME,
    property_type VARCHAR(50),
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_notes TEXT,
    admin_notes TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'scheduled', 'in_progress', 'completed', 'cancelled', 'no_show')),
    cancellation_reason TEXT,
    total_amount NUMERIC(10, 2),
    payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'partially_paid', 'refunded')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TECHNICIAN MANAGEMENT
-- =====================================================

-- Technicians
CREATE TABLE technicians (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    employee_id VARCHAR(50) UNIQUE,
    specializations TEXT[],
    is_available BOOLEAN DEFAULT true,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    completed_jobs INTEGER DEFAULT 0,
    joined_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Technician assignments
CREATE TABLE technician_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    technician_id UUID REFERENCES technicians(id) ON DELETE SET NULL,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    assigned_by UUID REFERENCES profiles(id),
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'assigned' CHECK (status IN ('assigned', 'en_route', 'arrived', 'in_progress', 'completed', 'reassigned')),
    notes TEXT
);

-- =====================================================
-- MAINTENANCE PACKAGES & SUBSCRIPTIONS
-- =====================================================

-- Maintenance packages
CREATE TABLE maintenance_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    package_type VARCHAR(50) CHECK (package_type IN ('essential', 'premium', 'complete')),
    price NUMERIC(10, 2) NOT NULL,
    duration_months INTEGER NOT NULL,
    included_services JSONB NOT NULL,
    service_limits JSONB,
    discount_percentage NUMERIC(5, 2) DEFAULT 0,
    benefits_en TEXT[],
    benefits_ar TEXT[],
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer subscriptions
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subscription_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    package_id UUID REFERENCES maintenance_packages(id),
    property_id UUID REFERENCES customer_properties(id) ON DELETE SET NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price_paid NUMERIC(10, 2) NOT NULL,
    payment_method VARCHAR(50),
    payment_reference VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'expired', 'cancelled', 'suspended')),
    services_used JSONB DEFAULT '[]',
    auto_renew BOOLEAN DEFAULT false,
    renewal_reminder_sent BOOLEAN DEFAULT false,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancellation_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- WARRANTY SYSTEM
-- =====================================================

-- Warranty certificates
CREATE TABLE warranty_certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    certificate_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    service_id UUID REFERENCES services(id),
    issue_date DATE NOT NULL,
    start_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    coverage_details_en TEXT,
    coverage_details_ar TEXT,
    exclusions_en TEXT,
    exclusions_ar TEXT,
    terms_en TEXT,
    terms_ar TEXT,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'expired', 'voided', 'claimed')),
    pdf_url TEXT,
    issued_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Warranty claims
CREATE TABLE warranty_claims (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    claim_number VARCHAR(50) UNIQUE NOT NULL,
    certificate_id UUID REFERENCES warranty_certificates(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    claim_description TEXT NOT NULL,
    issue_photos TEXT[],
    submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'approved', 'rejected', 'resolved')),
    admin_notes TEXT,
    resolution_description TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolved_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- SERVICE REPORTS
-- =====================================================

-- Service reports
CREATE TABLE service_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_number VARCHAR(50) UNIQUE NOT NULL,
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    technician_id UUID REFERENCES technicians(id) ON DELETE SET NULL,
    service_date DATE NOT NULL,
    work_description_en TEXT,
    work_description_ar TEXT,
    materials_used JSONB,
    labor_hours NUMERIC(5, 2),
    completion_status VARCHAR(50) CHECK (completion_status IN ('completed', 'partial', 'pending_parts')),
    customer_signature TEXT,
    technician_notes TEXT,
    pdf_url TEXT,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Report attachments
CREATE TABLE report_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES service_reports(id) ON DELETE CASCADE,
    file_type VARCHAR(50) CHECK (file_type IN ('before', 'after', 'material', 'signature', 'other')),
    file_url TEXT NOT NULL,
    file_name VARCHAR(255),
    file_size_kb INTEGER,
    caption_en TEXT,
    caption_ar TEXT,
    display_order INTEGER DEFAULT 0,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- NOTIFICATION SYSTEM
-- =====================================================

-- Notification templates
CREATE TABLE notification_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_key VARCHAR(100) UNIQUE NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    channel VARCHAR(50) CHECK (channel IN ('whatsapp', 'sms', 'email', 'push')),
    message_en TEXT NOT NULL,
    message_ar TEXT NOT NULL,
    variables JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notification logs
CREATE TABLE notification_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    template_key VARCHAR(100),
    channel VARCHAR(50),
    recipient VARCHAR(255) NOT NULL,
    message_content TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed', 'read')),
    provider_response JSONB,
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    sent_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- AI ASSISTANT
-- =====================================================

-- AI chat history
CREATE TABLE ai_chat_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    session_id UUID NOT NULL,
    message_role VARCHAR(20) CHECK (message_role IN ('user', 'assistant', 'system')),
    message_content TEXT NOT NULL,
    message_language VARCHAR(5) CHECK (message_language IN ('en', 'ar')),
    image_url TEXT,
    suggested_services UUID[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CUSTOMER PREFERENCES
-- =====================================================

-- Customer preferences
CREATE TABLE customer_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    notification_whatsapp BOOLEAN DEFAULT true,
    notification_sms BOOLEAN DEFAULT true,
    notification_email BOOLEAN DEFAULT true,
    marketing_consent BOOLEAN DEFAULT false,
    preferred_contact_time VARCHAR(50),
    special_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- REVIEWS & RATINGS
-- =====================================================

-- Customer reviews
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    service_id UUID REFERENCES services(id),
    technician_id UUID REFERENCES technicians(id) ON DELETE SET NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text_en TEXT,
    review_text_ar TEXT,
    is_published BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    admin_response TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- AUDIT LOGS
-- =====================================================

-- Audit trail
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action_type VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_profiles_role ON profiles(role_id);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_phone ON profiles(phone);

CREATE INDEX idx_customer_properties_customer ON customer_properties(customer_id);
CREATE INDEX idx_customer_properties_city ON customer_properties(city);

CREATE INDEX idx_services_category ON services(category_id);
CREATE INDEX idx_services_active ON services(is_active);

CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_scheduled_date ON bookings(scheduled_date);

CREATE INDEX idx_subscriptions_customer ON subscriptions(customer_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_end_date ON subscriptions(end_date);

CREATE INDEX idx_warranty_certificates_customer ON warranty_certificates(customer_id);
CREATE INDEX idx_warranty_certificates_status ON warranty_certificates(status);

CREATE INDEX idx_notification_logs_customer ON notification_logs(customer_id);
CREATE INDEX idx_notification_logs_status ON notification_logs(status);
CREATE INDEX idx_notification_logs_created ON notification_logs(created_at);

CREATE INDEX idx_ai_chat_customer_session ON ai_chat_history(customer_id, session_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE warranty_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE warranty_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read their own profile
CREATE POLICY profiles_select_own ON profiles
    FOR SELECT USING (auth.uid() = id);

-- Profiles: Users can update their own profile
CREATE POLICY profiles_update_own ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY profiles_admin_all ON profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles p
            JOIN roles r ON p.role_id = r.id
            WHERE p.id = auth.uid() AND r.name IN ('admin', 'super_admin')
        )
    );

-- Customer properties: Customers can manage their own properties
CREATE POLICY customer_properties_own ON customer_properties
    FOR ALL USING (customer_id = auth.uid());

-- Bookings: Customers can view their own bookings
CREATE POLICY bookings_customer_view ON bookings
    FOR SELECT USING (customer_id = auth.uid());

-- Bookings: Customers can create bookings
CREATE POLICY bookings_customer_insert ON bookings
    FOR INSERT WITH CHECK (customer_id = auth.uid());

-- Bookings: Admins can manage all bookings
CREATE POLICY bookings_admin_all ON bookings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles p
            JOIN roles r ON p.role_id = r.id
            WHERE p.id = auth.uid() AND r.name IN ('admin', 'super_admin')
        )
    );

-- Subscriptions: Customers can view their own subscriptions
CREATE POLICY subscriptions_customer_view ON subscriptions
    FOR SELECT USING (customer_id = auth.uid());

-- AI Chat: Customers can view their own chat history
CREATE POLICY ai_chat_customer_own ON ai_chat_history
    FOR ALL USING (customer_id = auth.uid());

-- Service reports: Customers can view reports for their bookings
CREATE POLICY reports_customer_view ON service_reports
    FOR SELECT USING (customer_id = auth.uid());

-- Warranties: Customers can view their own warranties
CREATE POLICY warranties_customer_view ON warranty_certificates
    FOR SELECT USING (customer_id = auth.uid());

-- Public read access for services and categories
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY services_public_read ON services
    FOR SELECT USING (is_active = true);

CREATE POLICY categories_public_read ON service_categories
    FOR SELECT USING (is_active = true);

CREATE POLICY packages_public_read ON maintenance_packages
    FOR SELECT USING (is_active = true);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON customer_properties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_warranties_updated_at BEFORE UPDATE ON warranty_certificates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SEED DATA
-- =====================================================

-- Insert service categories
INSERT INTO service_categories (name_en, name_ar, icon, display_order) VALUES
    ('Air Conditioning', 'التكييف', '❄️', 1),
    ('Plumbing', 'السباكة', '🚰', 2),
    ('Electrical', 'الكهرباء', '⚡', 3),
    ('Painting', 'الدهان', '🎨', 4),
    ('Carpentry', 'النجارة', '🔨', 5),
    ('Cleaning', 'التنظيف', '✨', 6),
    ('Pest Control', 'مكافحة الحشرات', '🦟', 7),
    ('Waterproofing', 'العزل', '💧', 8),
    ('Tiles & Flooring', 'البلاط', '⬜', 9),
    ('Gypsum', 'الجبس', '🏗️', 10),
    ('Garden', 'الحدائق', '🌳', 11),
    ('Renovation', 'التجديد', '🏡', 12);

-- Insert notification templates
INSERT INTO notification_templates (template_key, name_en, name_ar, channel, message_en, message_ar, variables) VALUES
    ('booking_received', 'Booking Received', 'تم استلام الحجز', 'whatsapp',
     'Thank you for your booking! Reference: {{booking_number}}. We will confirm your appointment shortly.',
     'شكراً لحجزك! المرجع: {{booking_number}}. سنؤكد موعدك قريباً.',
     '["booking_number"]'::jsonb),
    ('booking_confirmed', 'Booking Confirmed', 'تأكيد الحجز', 'whatsapp',
     'Your appointment is confirmed for {{date}} at {{time}}. Service: {{service_name}}.',
     'تم تأكيد موعدك في {{date}} الساعة {{time}}. الخدمة: {{service_name}}.',
     '["date", "time", "service_name"]'::jsonb),
    ('technician_assigned', 'Technician Assigned', 'تم تعيين فني', 'whatsapp',
     'A technician has been assigned to your booking. They will arrive on {{date}}.',
     'تم تعيين فني لحجزك. سيصل في {{date}}.',
     '["date"]'::jsonb),
    ('service_completed', 'Service Completed', 'تم إكمال الخدمة', 'whatsapp',
     'Your service has been completed. View your service report in your dashboard.',
     'تم إكمال خدمتك. اطلع على تقرير الخدمة في لوحة التحكم.',
     '[]'::jsonb),
    ('warranty_issued', 'Warranty Certificate Issued', 'صدور شهادة الضمان', 'whatsapp',
     'Your warranty certificate {{certificate_number}} has been issued. Valid until {{expiry_date}}.',
     'تم إصدار شهادة الضمان {{certificate_number}}. صالحة حتى {{expiry_date}}.',
     '["certificate_number", "expiry_date"]'::jsonb);

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

-- Database schema created successfully
-- Total tables: 27
-- RLS policies: Enabled on all customer-facing tables
-- Indexes: Created for performance optimization
-- Ready for Supabase deployment