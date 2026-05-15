const { createClient } = require('@supabase/supabase-js');
const sb = createClient(
  'https://tylcspluiwfbysnbfafu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5bGNzcGx1aXdmYnlzbmJmYWZ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODYyNDM0MiwiZXhwIjoyMDk0MjAwMzQyfQ.UVMx0S-FrxWYcMna_89tZRJTmSrdn6i9sgaf1HCDPm0'
);

// Insert a test row with style_config to see if column exists, 
// otherwise we need to use the SQL editor in Supabase dashboard
async function main() {
  // Try patching an existing row with style_config
  const { error } = await sb
    .from('qr_codes')
    .update({ style_config: { dotStyle: 'dots', markerStyle: 'extra-rounded', color: '#000000', bgColor: '#ffffff' } })
    .eq('slug', 'gpXyCMCJ');
  
  if (error) {
    console.log('Column missing - need to add it:', error.message);
  } else {
    console.log('style_config column exists and updated OK');
  }
}
main();
