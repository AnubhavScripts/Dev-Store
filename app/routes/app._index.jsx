import { useState, useCallback } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import Polaris,{
  Page,
  Layout,
  Card,
  Button,
  Text,
  Banner,
  TextField,
  ColorPicker,
  Checkbox,
  BlockStack,
  InlineStack,
  Divider,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  
  // Get current metafield values using shop metafields
  const response = await admin.graphql(
    `#graphql
      query getAppMetafields {
        shop {
          metafields(namespace: "promotional_banner", first: 10) {
            edges {
              node {
                id
                namespace
                key
                value
              }
            }
          }
        }
      }`
  );
  
  const data = await response.json();
  const metafields = data.data?.shop?.metafields?.edges || [];
  
  // Extract current settings
  const settings = {
    enabled: false,
    bannerText: "🎉 Free Shipping on All Orders! 🎉",
    showCloseButton: true,
    backgroundColor: "#667eea"
  };
  
  metafields.forEach(({ node }) => {
    if (node.namespace === "promotional_banner") {
      switch (node.key) {
        case "enabled":
          settings.enabled = node.value === "true";
          break;
        case "banner_text":
          settings.bannerText = node.value;
          break;
        case "show_close_button":
          settings.showCloseButton = node.value === "true";
          break;
        case "background_color":
          settings.backgroundColor = node.value;
          break;
      }
    }
  });
  
  return json({ settings });
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();
  
  const settings = {
    enabled: formData.get("enabled") === "true",
    bannerText: formData.get("bannerText"),
    showCloseButton: formData.get("showCloseButton") === "true",
    backgroundColor: formData.get("backgroundColor")
  };
  
  // First get the shop ID
  const shopResponse = await admin.graphql(`
    query {
      shop {
        id
      }
    }
  `);
  const shopData = await shopResponse.json();
  const shopGid = shopData.data.shop.id;
  
  // Update metafields using shop metafields
  const mutations = Object.entries(settings).map(([key, value]) => ({
    namespace: "promotional_banner",
    key,
    value: String(value),
    type: "single_line_text_field",
    ownerId: shopGid
  }));
  
  try {
    for (const metafield of mutations) {
      await admin.graphql(
        `#graphql
          mutation CreateShopMetafield($metafield: MetafieldsSetInput!) {
            metafieldsSet(metafields: [$metafield]) {
              metafields {
                id
                key
                value
              }
              userErrors {
                field
                message
              }
            }
          }`,
        {
          variables: {
            metafield
          }
        }
      );
    }
    
    return json({ success: true, message: "Settings saved successfully!" });
  } catch (error) {
    console.error("Error saving metafields:", error);
    return json({ success: false, message: "Failed to save settings" });
  }
};


export default function Index() {
  const { settings } = useLoaderData();
  const submit = useSubmit();
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = useCallback(() => {
    setIsSaving(true);
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    submit(form, { method: "post" });
    setTimeout(() => setIsSaving(false), 1000);
  }, [formData, submit]);

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="5">
              <Text variant="headingLg" as="h1">
                Promotional Banner Settings
              </Text>
              
              <Banner
                title="Theme App Extension"
                tone="info"
              >
                <p>
                  This app uses a Theme App Extension to display banners. 
                  After enabling, you'll need to add the banner block to your theme sections.
                </p>
              </Banner>

              <Checkbox
                label="Enable Promotional Banner"
                checked={formData.enabled}
                onChange={(value) => handleChange("enabled", value)}
              />

              <TextField
                label="Banner Text"
                value={formData.bannerText}
                onChange={(value) => handleChange("bannerText", value)}
                multiline={2}
                helpText="The text that will appear in the promotional banner"
              />

              <Checkbox
                label="Show Close Button"
                checked={formData.showCloseButton}
                onChange={(value) => handleChange("showCloseButton", value)}
                helpText="Allow customers to close the banner"
              />

              <ColorPicker
                label="Background Color"
                color={formData.backgroundColor}
                onChange={(value) => handleChange("backgroundColor", value)}
              />

              <Divider />

              <InlineStack align="end">
                <Button
                  variant="primary"
                  loading={isSaving}
                  onClick={handleSubmit}
                >
                  Save Settings
                </Button>
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="4">
              <Text variant="headingMd" as="h2">
                Preview
              </Text>
              
              <div style={{
                background: formData.backgroundColor,
                color: 'white',
                textAlign: 'center',
                padding: '12px 20px',
                borderRadius: '4px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                {formData.bannerText}
              </div>

              <Text variant="bodyMd" tone="subdued">
                This is how your banner will appear on the storefront.
              </Text>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="4">
              <Text variant="headingMd" as="h2">
                Installation Instructions
              </Text>
              
              <BlockStack gap="2">
                <Text variant="bodyMd">
                  1. Enable the banner using the toggle above
                </Text>
                <Text variant="bodyMd">
                  2. Go to your theme editor (Online Store → Themes → Customize)
                </Text>
                <Text variant="bodyMd">
                  3. Add a new section or block
                </Text>
                <Text variant="bodyMd">
                  4. Look for "Promotional Banner" in the Apps section
                </Text>
                <Text variant="bodyMd">
                  5. Add it to the top of your page
                </Text>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}