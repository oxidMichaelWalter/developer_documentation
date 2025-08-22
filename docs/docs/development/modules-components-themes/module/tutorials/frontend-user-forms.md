# Extending a Frontend User Form

Add additional form input fields in frontend without need to add additional logic how to save the field data.

This page describes how to achieve this by using [extend user module example](https://github.com/OXID-eSales/extend-user-demo-module).

## Adjusting the User Table

For having additional input field in user form, first create a new column in the user table.

Do this by using the [events](../skeleton/metadataphp/amodule/events) module.

In our example, we use a database table column called `EXTENDUSER_ADDITIONALCONTACTINFO`.

## Extending the Template

:::caution
Our example applies to **Smarty** templates only.

To find out how to extend **Twig** blocks, see [Using Twig in module templates](../using-twig-in-module-templates).
:::

Find the block to be extended in the `form/fieldset/user_billing.tpl` template file.

To extend it, create a template file and describe it in the `metadata.php` file:

```php
'blocks' => array(
    array('template' => 'form/fieldset/user_billing.tpl', 'block'=>'form_user_billing_country', 'file'=>'/views/user.tpl'),
),
```

The `/views/user.tpl` template content could look like this:

```smarty
[{$smarty.block.parent}]

<div class="form-group">
    <label class="control-label col-lg-3">Additional contact info</label>
    <div class="col-lg-9">
        <input class="form-control" type="text" maxlength="128"
               name="invadr[oxuser__extenduser_additionalcontactinfo]"
               value="[{$oxcmp_user->oxuser__extenduser_additionalcontactinfo->value}]"
               required=""
        >
    </div>
</div>
```

The most important thing here is the input field with the name attribute `name="invadr[oxuser__extenduser_additionalcontactinfo]"` which says for OXID eShop to try to write the provided value into the `EXTENDUSER_ADDITIONALCONTACTINFO` column of the `oxuser` table.

## Modifying White-listed Fields

For security reasons, there is an array of "white-listed" fields. Only those table columns which have the corresponding field in the "whitelist" array can be updated by submitting the form and passing parameters via POST requests.

There are two classes containing white-listed fields:

* Table `oxusers`: `OxidEsales\EshopCommunity\Application\Model\User\UserUpdatableFields`
* Table `oxaddress`: `OxidEsales\EshopCommunity\Application\Model\User\UserShippingAddressUpdatableFields`

So, to add additional field to the whitelist, extend one of those classes.

### Example

In the `oxuser` table case - `OxidEsales\EshopCommunity\Application\Model\User\UserUpdatableFields`, the entry in module metadata file would look like this:

```php
'extend' => [
    \OxidEsales\Eshop\Application\Model\User\UserUpdatableFields::class => \OxidEsales\ExtendUser\UserUpdatableFields::class
],
```

And the contents of file could look like this:

```php
namespace OxidEsales\ExtendUser;
/**
 * @see \OxidEsales\Eshop\Application\Model\User\UserUpdatableFields
 */
class UserUpdatableFields extends UserUpdatableFields_parent
{
    public function getUpdatableFields()
    {
        $updatableFields = parent::getUpdatableFields();
        return array_merge($updatableFields, ['EXTENDUSER_ADDITIONALCONTACTINFO']);
    }
}
```

In this way, the new `EXTENDUSER_ADDITIONALCONTACTINFO` field is added to the updatable fields array.

So, after module activation, the new form field appears in the user form.