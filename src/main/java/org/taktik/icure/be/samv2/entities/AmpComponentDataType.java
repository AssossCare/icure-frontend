//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.8-b130911.1802
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a>
// Any modifications to this file will be lost upon recompilation of the source schema.
// Generated on: 2019.05.22 at 08:11:32 PM CEST
//


package org.taktik.icure.be.samv2.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import org.taktik.icure.be.ehealth.samws.v2.actual.common.ContainsAlcoholType;
import org.taktik.icure.be.ehealth.samws.v2.actual.common.CrushableType;
import org.taktik.icure.be.ehealth.samws.v2.core.Text255Type;
import org.taktik.icure.be.ehealth.samws.v2.core.TextType;


/**
 * <p>Java class for AmpComponentDataType complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="AmpComponentDataType">
 *   &lt;complexContent>
 *     &lt;extension base="{urn:be:fgov:ehealth:samws:v2:export}DataPeriodType">
 *       &lt;sequence>
 *         &lt;group ref="{urn:be:fgov:ehealth:samws:v2:export}AmpComponentFamhpReferenceFields"/>
 *         &lt;group ref="{urn:be:fgov:ehealth:samws:v2:actual:common}AmpComponentBcpiFields" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "AmpComponentDataType", propOrder = {
    "pharmaceuticalForms",
    "routeOfAdministrations",
    "dividable",
    "scored",
    "crushable",
    "containsAlcohol",
    "sugarFree",
    "modifiedReleaseType",
    "specificDrugDevice",
    "dimensions",
    "name",
    "note"
})
public class AmpComponentDataType
    extends DataPeriodType
    implements Serializable
{

    private final static long serialVersionUID = 2L;
    @XmlElement(name = "PharmaceuticalForm", required = true)
    protected List<PharmaceuticalFormWithStandardsType> pharmaceuticalForms;
    @XmlElement(name = "RouteOfAdministration", required = true)
    protected List<RouteOfAdministrationWithStandardsType> routeOfAdministrations;
    @XmlElement(name = "Dividable", namespace = "urn:be:fgov:ehealth:samws:v2:actual:common")
    protected String dividable;
    @XmlElement(name = "Scored", namespace = "urn:be:fgov:ehealth:samws:v2:actual:common")
    protected String scored;
    @XmlElement(name = "Crushable", namespace = "urn:be:fgov:ehealth:samws:v2:actual:common")
    @XmlSchemaType(name = "string")
    protected CrushableType crushable;
    @XmlElement(name = "ContainsAlcohol", namespace = "urn:be:fgov:ehealth:samws:v2:actual:common")
    @XmlSchemaType(name = "string")
    protected ContainsAlcoholType containsAlcohol;
    @XmlElement(name = "SugarFree", namespace = "urn:be:fgov:ehealth:samws:v2:actual:common")
    protected Boolean sugarFree;
    @XmlElement(name = "ModifiedReleaseType", namespace = "urn:be:fgov:ehealth:samws:v2:actual:common")
    @XmlSchemaType(name = "integer")
    protected Integer modifiedReleaseType;
    @XmlElement(name = "SpecificDrugDevice", namespace = "urn:be:fgov:ehealth:samws:v2:actual:common")
    @XmlSchemaType(name = "integer")
    protected Integer specificDrugDevice;
    @XmlElement(name = "Dimensions", namespace = "urn:be:fgov:ehealth:samws:v2:actual:common")
    protected String dimensions;
    @XmlElement(name = "Name", namespace = "urn:be:fgov:ehealth:samws:v2:actual:common")
    protected Text255Type name;
    @XmlElement(name = "Note", namespace = "urn:be:fgov:ehealth:samws:v2:actual:common")
    protected TextType note;

    /**
     * Gets the value of the pharmaceuticalForms property.
     *
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the pharmaceuticalForms property.
     *
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getPharmaceuticalForms().add(newItem);
     * </pre>
     *
     *
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link PharmaceuticalFormWithStandardsType }
     *
     *
     */
    public List<PharmaceuticalFormWithStandardsType> getPharmaceuticalForms() {
        if (pharmaceuticalForms == null) {
            pharmaceuticalForms = new ArrayList<PharmaceuticalFormWithStandardsType>();
        }
        return this.pharmaceuticalForms;
    }

    /**
     * Gets the value of the routeOfAdministrations property.
     *
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the routeOfAdministrations property.
     *
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getRouteOfAdministrations().add(newItem);
     * </pre>
     *
     *
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link RouteOfAdministrationWithStandardsType }
     *
     *
     */
    public List<RouteOfAdministrationWithStandardsType> getRouteOfAdministrations() {
        if (routeOfAdministrations == null) {
            routeOfAdministrations = new ArrayList<RouteOfAdministrationWithStandardsType>();
        }
        return this.routeOfAdministrations;
    }

    /**
     * Gets the value of the dividable property.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getDividable() {
        return dividable;
    }

    /**
     * Sets the value of the dividable property.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setDividable(String value) {
        this.dividable = value;
    }

    /**
     * Gets the value of the scored property.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getScored() {
        return scored;
    }

    /**
     * Sets the value of the scored property.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setScored(String value) {
        this.scored = value;
    }

    /**
     * Gets the value of the crushable property.
     *
     * @return
     *     possible object is
     *     {@link CrushableType }
     *
     */
    public CrushableType getCrushable() {
        return crushable;
    }

    /**
     * Sets the value of the crushable property.
     *
     * @param value
     *     allowed object is
     *     {@link CrushableType }
     *
     */
    public void setCrushable(CrushableType value) {
        this.crushable = value;
    }

    /**
     * Gets the value of the containsAlcohol property.
     *
     * @return
     *     possible object is
     *     {@link ContainsAlcoholType }
     *
     */
    public ContainsAlcoholType getContainsAlcohol() {
        return containsAlcohol;
    }

    /**
     * Sets the value of the containsAlcohol property.
     *
     * @param value
     *     allowed object is
     *     {@link ContainsAlcoholType }
     *
     */
    public void setContainsAlcohol(ContainsAlcoholType value) {
        this.containsAlcohol = value;
    }

    /**
     * Gets the value of the sugarFree property.
     *
     * @return
     *     possible object is
     *     {@link Boolean }
     *
     */
    public Boolean isSugarFree() {
        return sugarFree;
    }

    /**
     * Sets the value of the sugarFree property.
     *
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *
     */
    public void setSugarFree(Boolean value) {
        this.sugarFree = value;
    }

    /**
     * Gets the value of the modifiedReleaseType property.
     *
     * @return
     *     possible object is
     *     {@link Integer }
     *
     */
    public Integer getModifiedReleaseType() {
        return modifiedReleaseType;
    }

    /**
     * Sets the value of the modifiedReleaseType property.
     *
     * @param value
     *     allowed object is
     *     {@link Integer }
     *
     */
    public void setModifiedReleaseType(Integer value) {
        this.modifiedReleaseType = value;
    }

    /**
     * Gets the value of the specificDrugDevice property.
     *
     * @return
     *     possible object is
     *     {@link Integer }
     *
     */
    public Integer getSpecificDrugDevice() {
        return specificDrugDevice;
    }

    /**
     * Sets the value of the specificDrugDevice property.
     *
     * @param value
     *     allowed object is
     *     {@link Integer }
     *
     */
    public void setSpecificDrugDevice(Integer value) {
        this.specificDrugDevice = value;
    }

    /**
     * Gets the value of the dimensions property.
     *
     * @return
     *     possible object is
     *     {@link String }
     *
     */
    public String getDimensions() {
        return dimensions;
    }

    /**
     * Sets the value of the dimensions property.
     *
     * @param value
     *     allowed object is
     *     {@link String }
     *
     */
    public void setDimensions(String value) {
        this.dimensions = value;
    }

    /**
     * Gets the value of the name property.
     *
     * @return
     *     possible object is
     *     {@link Text255Type }
     *
     */
    public Text255Type getName() {
        return name;
    }

    /**
     * Sets the value of the name property.
     *
     * @param value
     *     allowed object is
     *     {@link Text255Type }
     *
     */
    public void setName(Text255Type value) {
        this.name = value;
    }

    /**
     * Gets the value of the note property.
     *
     * @return
     *     possible object is
     *     {@link TextType }
     *
     */
    public TextType getNote() {
        return note;
    }

    /**
     * Sets the value of the note property.
     *
     * @param value
     *     allowed object is
     *     {@link TextType }
     *
     */
    public void setNote(TextType value) {
        this.note = value;
    }

}
